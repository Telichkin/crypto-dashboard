FROM bitwalker/alpine-elixir:1.6.1 as build

COPY . .

ENV MIX_ENV=prod \
    APP_NAME=crypto_dashboard

RUN mix deps.get && \
    mix release

RUN RELEASE_DIR=`ls -d _build/prod/rel/$APP_NAME/releases/*/` && \
    mkdir /export && \
    tar -xf "$RELEASE_DIR/${APP_NAME}.tar.gz" -C /export


FROM pentacent/alpine-erlang-base:latest as deploy

ENV REPLACE_OS_VARS=true \
    APP_PORT=4000 \
    APP_HOST="0.0.0.0"

EXPOSE ${APP_PORT}

WORKDIR /opt/app
COPY --from=build /export/ .

ENTRYPOINT ["/opt/app/bin/crypto_dashboard"]
CMD ["foreground"]