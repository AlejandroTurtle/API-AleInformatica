# Use official Node.js image as the base image
FROM node:23-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 8031

# Command to run the application
CMD ["npm", "start"]