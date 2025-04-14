# Base image for dependencies
FROM node:22-alpine AS deps

WORKDIR /app

RUN apk add --no-cache libc6-compat

# Install deps
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN \
  if [ -f package-lock.json ]; then npm ci; \
  elif [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm install --frozen-lockfile; \
  fi

# Copy source and build
FROM node:22-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Final production image
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# # Optional for next/image optimization
# RUN apk add --no-cache sharp

# Install PM2
RUN npm install -g pm2

# Copy built app
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# PM2 config (optional, can use inline too)
COPY ecosystem.config.js ./

EXPOSE 3000

CMD ["pm2-runtime", "start", "ecosystem.config.js"]
