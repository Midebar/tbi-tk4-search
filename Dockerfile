# Use an official Node.js runtime as the base image
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./


RUN npm install

COPY . .

RUN npm run build

# Use Nginx to serve the build files
FROM nginx:alpine

# Copy the build output to the Nginx HTML directory
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]