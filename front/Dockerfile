# front/Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy only package files first (for better caching)
COPY front/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code *after* dependencies*
COPY front/ ./

# Expose Vite dev port
EXPOSE 5173

# Default command (Vite dev server)
CMD ["npm", "run", "dev", "--", "--host"]
