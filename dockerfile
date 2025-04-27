FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache postgresql-client

COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

COPY . .

RUN npx prisma generate
RUN npm run build

EXPOSE 3000
CMD ["sh", "-c", "until pg_isready -h postgres -U myuser; do echo 'Waiting for database...'; sleep 2; done; npx prisma migrate deploy && npm start"]