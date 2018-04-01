defmodule CryptoDashboard.CryptoCompareClient do
  @from_currency "ETH"
  @to_currency "USD"

  def exchange_rates do
    available_exchanges_names()
    |> Enum.reduce(%{}, fn (name, rates) -> Map.put(rates, name, exchange_rate_for(name)) end)
  end

  def available_exchanges_names do
    {:ok, response} = HTTPoison.get "https://min-api.cryptocompare.com/data/all/exchanges"
    allExchanges = Jason.decode!(response.body)
    Enum.reduce(allExchanges, [], &only_relevant_exchanges(&1, &2))
  end

  def only_relevant_exchanges({exchange_name, from_currencies}, relevant_exchanges) do
    to_currencies = Map.get(from_currencies, @from_currency, [])
    case @to_currency in to_currencies do
      true -> [exchange_name | relevant_exchanges]
      false -> relevant_exchanges
    end
  end

  def exchange_rate_for(exchange_name) do
    {:ok, response} = HTTPoison.get "https://min-api.cryptocompare.com/data/price?fsym=#{@from_currency}&tsyms=#{@to_currency}&e=#{exchange_name}"
    exchange_rate = Jason.decode!(response.body)[@to_currency]
    "#{exchange_rate} #{@to_currency}"
  end
end
