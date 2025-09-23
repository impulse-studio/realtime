# Builder stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first for better layer caching
COPY ./service/package.json ./service/tsconfig.json ./service/

# Copy source code
COPY ./service/src ./service/src

# Copy root workspace
COPY ./tsconfig.base.json ./tsconfig.base.json

# Install dependencies and build
WORKDIR /app/service
RUN npm ci || npm install
RUN npm run build

# Runtime stage
FROM node:20-alpine AS runner

WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Copy package.json for production deps
COPY --from=builder /app/service/package.json ./

# Copy node_modules from builder
COPY --from=builder /app/service/node_modules ./node_modules

# Remove dev dependencies
RUN npm prune --omit=dev

# Copy built application
COPY --from=builder /app/service/dist ./dist

# Expose port and set default
EXPOSE 3200
ENV PORT=3200

# Run the CLI
CMD ["node", "dist/cli.js"]