FROM node:9.10 as build

ARG BACKEND_HOST
ARG BACKEND_PORT

WORKDIR /build
COPY . .
RUN npm i && \
    npm run build
RUN cp -r /build/dist/ /export


FROM nginx:alpine as deploy

COPY --from=build /export /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]