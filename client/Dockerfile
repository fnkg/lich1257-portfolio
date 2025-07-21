# ---------- dependencies ----------
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json yarn.lock ./
COPY client/package.json ./client/package.json
COPY server/package.json ./server/package.json
RUN yarn install --frozen-lockfile

# ---------- build ----------
FROM node:22-alpine AS build
WORKDIR /app
ENV NODE_ENV=production
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
COPY --from=deps /app/node_modules ./node_modules
COPY . .
WORKDIR /app/client
RUN yarn build

# ---------- runtime ----------
FROM node:22-alpine AS runner
WORKDIR /app/client
ENV NODE_ENV=production
ENV PORT=3000

# server.js + runtime
COPY --from=build /app/client/.next/standalone/client ./
# node_modules (уровнем выше)
COPY --from=build /app/client/.next/standalone/node_modules ../node_modules
# статические файлы для /_next/static/...
COPY --from=build /app/client/.next/static ./.next/static
# public/
COPY --from=build /app/client/public ./public

EXPOSE 3000
CMD ["node", "server.js"]
