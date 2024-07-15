# Use the official Node.js image as the base image with Node.js version 14
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend application to the container
COPY . .

# Expose the port the backend application will run on (adjust if necessary)
EXPOSE 3000

# Command to run the backend application
CMD ["npm", "start"]
