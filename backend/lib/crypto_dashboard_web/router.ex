defmodule CryptoDashboardWeb.Router do
  use CryptoDashboardWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", CryptoDashboardWeb do
    pipe_through :api
  end
end
