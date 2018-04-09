use Mix.Config

# Configures the endpoint
config :crypto_dashboard, CryptoDashboardWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "kN3TYbp4QyBhTBAeTku9cAjzrc0Wwhyo+fx99+POqxHa/p/gIUz7C5qDf9TAW4y8",
  pubsub: [name: CryptoDashboard.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
