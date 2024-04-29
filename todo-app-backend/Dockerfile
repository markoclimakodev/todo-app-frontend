FROM node:20.11.0-alpine3.18
# Set Node.js base image.

WORKDIR /usr/src/app
# Set working directory.

COPY package*.json ./
# Copy package files.

RUN npm install
# Install dependencies.

COPY . .
# Copy application files.

EXPOSE 3001
# Expose port 3001.

RUN npm build

CMD ["npm", "start"]
# Start application in production mode.
