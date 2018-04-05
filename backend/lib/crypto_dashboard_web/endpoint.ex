defmodule CryptoDashboardWeb.Endpoint do
  use Phoenix.Endpoint, otp_app: :crypto_dashboard

  socket "/socket", CryptoDashboardWeb.UserSocket

  @doc """
  Callback invoked for dynamically configuring the endpoint.

  It receives the endpoint configuration and checks if
  configuration should be loaded from the system environment.
  """
  def init(_key, config) do
      {:ok, config}
  end
end
