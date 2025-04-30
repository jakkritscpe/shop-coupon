# -------- Build Stage --------
    FROM node:18-alpine AS builder

    WORKDIR /app
    
    # Copy package files and install
    COPY package*.json ./
    RUN npm install
    
    # Copy the rest of the app
    COPY . .
    
    # Prisma generate before build (important for Prisma client)
    RUN npx prisma generate
    
    # Build Next.js app
    RUN npm run build
    
    # -------- Production Stage --------
    FROM node:18-alpine AS runner
    
    # Required dependencies for Prisma client and Alpine base image
    RUN apk add --no-cache libc6-compat
    
    WORKDIR /app
    
    # Copy env (you can also mount this from docker-compose if preferred)
    COPY .env.local .env.local
    
    # Copy only what's needed for production
    COPY --from=builder /app/package*.json ./
    COPY --from=builder /app/.next ./.next
    COPY --from=builder /app/public ./public
    COPY --from=builder /app/next.config.js ./
    COPY --from=builder /app/prisma ./prisma
    COPY --from=builder /app/node_modules ./node_modules
    
    # Optional: set NODE_ENV to production
    ENV NODE_ENV=production
    
    EXPOSE 3000
    CMD ["npm", "start"]
    