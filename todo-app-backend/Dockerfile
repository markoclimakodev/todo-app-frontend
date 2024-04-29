FROM node:20.11.0-alpine3.18
# Set Node.js base image.

WORKDIR /usr/src/app
# Set working directory.

COPY package*.json ./
# Copy package files.

RUN npm install
# Install dependencies.

RUN npx prisma generate --schema=src/adapters/database/prisma/schema.prisma

COPY . .
# Copy application files.

EXPOSE 3001
# Expose port 3001.

CMD ["npm", "start"]
# Start application in production mode.
