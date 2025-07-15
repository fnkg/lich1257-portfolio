FROM node:20-alpine as build
WORKDIR /app
COPY package.json yarn.lock ./
COPY client/package.json ./client/
RUN yarn install --frozen-lockfile
COPY client ./client
RUN yarn workspace client build

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/client/.next ./client/.next
COPY --from=build /app/client/public ./client/public
COPY client/package.json .
EXPOSE 3000
CMD ["yarn", "start"]
