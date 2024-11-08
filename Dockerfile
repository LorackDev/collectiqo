# Use Node.js base image
FROM node:23-alpine3.19

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install build dependencies
RUN apk add --no-cache python3 make g++ \
    && npm install \
    && apk del python3 make g++

# Copy the rest of the application code
COPY . .

# Build the application (if needed)
# RUN npm run build

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "app.js"]