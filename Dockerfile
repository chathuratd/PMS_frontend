# Build stage
FROM node:20 as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application to the container
COPY . .

# Build the React app for production
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy the built React app from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose the port the application will run on
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
