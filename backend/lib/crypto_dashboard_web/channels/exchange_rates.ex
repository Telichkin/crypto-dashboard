defmodule CryptoDashboardWeb.ExchangeRates do
  use Phoenix.Channel

  def join("exchange_rates", _message, socket) do
    {:ok, exchange_rates} = CryptoDashboard.ExchangeRatesStorage.exchange_rates()
    {:ok, exchange_rates, socket}
  end
end
