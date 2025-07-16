FROM node:20-alpine as build
WORKDIR /app
COPY package.json yarn.lock ./
COPY server/package.json ./server/
RUN yarn install --frozen-lockfile --production
COPY server ./server
WORKDIR /app/server
RUN yarn build

FROM node:20-alpine
RUN apk add --no-cache vips-dev   # sharp
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/server .
COPY --from=build /app/node_modules ./node_modules
EXPOSE 1337
CMD ["yarn", "start"]
