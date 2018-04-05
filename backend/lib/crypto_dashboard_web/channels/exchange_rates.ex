defmodule CryptoDashboardWeb.ExchangeRates do
  use Phoenix.Channel
  intercept ["exchange_rates"]

  def join("exchange_rates", _message, socket) do
    Phoenix.PubSub.subscribe(CryptoDashboard.PubSub, "exchange_rates")
    {:ok, exchange_rates} = CryptoDashboard.ExchangeRatesStorage.exchange_rates()
    {:ok, exchange_rates, socket}
  end

  def handle_info({:exchange_rates_updated, new_exchange_rates}, socket) do
    broadcast! socket, "exchange_rates", new_exchange_rates
    {:noreply, socket}
  end

  def handle_out("exchange_rates", _, socket) do
    {:noreply, socket}
  end
end
