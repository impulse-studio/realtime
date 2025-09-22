# Builder stage
FROM node:20-alpine as builder

WORKDIR /app

# Copy package files first for better layer caching
COPY package.json tsconfig.json ./

# Copy source code
COPY src ./src

# Install dependencies and build
RUN npm ci || npm install
RUN npm run build

# Runtime stage
FROM node:20-alpine as runner

WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Copy package.json for production deps
COPY --from=builder /app/package.json ./

# Copy node_modules from builder
COPY --from=builder /app/node_modules ./node_modules

# Remove dev dependencies
RUN npm prune --omit=dev

# Copy built application
COPY --from=builder /app/dist ./dist

# Expose port and set default
EXPOSE 3200
ENV PORT=3200

# Run the CLI
CMD ["node", "dist/cli.js"]