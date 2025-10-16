FROM node:20-alpine

WORKDIR /app

# Copy package.json and install dependencies
COPY front/package*.json ./
RUN npm install

# Copy frontend code
COPY front/ .

# Expose port
EXPOSE 3000

# Default command
CMD ["npm", "start"]

