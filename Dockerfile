# Build stage
FROM node:20 as build

# Declare the environment variable
ARG REACT_APP_API_URL

# Set the environment variable
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json .

# Install dependencies
RUN npm install

# Copy the rest of the application to the container
COPY . .

# Build the React app for production
RUN npm run build

# Production stage
FROM nginx:alpine

# Set the working directory in the container
WORKDIR /usr/share/nginx/html

# Remove the default Nginx server files
RUN rm -rf *

# Copy the build files to the Nginx server
COPY --from=build /app/build .

# Expose the port the application will run on
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
