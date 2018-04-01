defmodule CryptoDashboard.ExchangeRatesStorage do
  use GenServer
  alias CryptoDashboard.CryptoCompareClient, as: Client

  @server ExchangeRatesStorage

  def start_link do
    GenServer.start_link(__MODULE__, %{}, [name: @server])
  end

  def exchange_rates do
    GenServer.call(@server, :exchange_rates)
  end

  def init(%{}) do
    send(self(), :init)

    minute = 1000 * 60
    timer_ref = :erlang.send_after(minute, self(), :update_exchange_rates)
    {:ok, %{timer_ref: timer_ref, exchange_rates: %{}}}
  end

  def handle_call(:exchange_rates, _from, %{exchange_rates: ex} = state) do
    {:reply, {:ok, ex}, state}
  end

  def handle_info(:init, state) do
    {:noreply, %{state | exchange_rates: Client.exchange_rates()}}
  end
  def handle_info(:update_exchange_rates, %{timer_ref: t}) do
    :erlang.cancel_timer(t)

    minute = 1000 * 60
    timer_ref = :erlang.send_after(minute, self(), :update_exchange_rates)
    exchange_rates = Client.exchange_rates()

    Phoenix.PubSub.broadcast(CryptoDashboard.PubSub, "exchange_rates", {:exchange_rates_updated, exchange_rates})
    {:noreply, %{timer_ref: timer_ref, exchange_rates: exchange_rates}}
  end
end
