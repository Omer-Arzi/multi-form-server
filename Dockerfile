# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the TypeScript project (ensure you have "build" script in package.json)
RUN npm run build

# Expose port 5000 for the server
EXPOSE 5000

# Start the server
CMD ["node", "dist/server.js"]
