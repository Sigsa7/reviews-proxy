# Use an official node runtime as a parent image
FROM node:latest

# Make a folder in our image where source code will live
RUN mkdir -p /src/app

# Set the working directory to /app
WORKDIR /src/app

# Copy the current directory contents into the container at /app
COPY . /src/app

# Install any needed packages specified in package.json
RUN npm install

# Make port 80 available to the world outside this container
EXPOSE 80

# Define environment variable
ENV NAME ProxyDemo

# Run npm start when the container launches
CMD [ "npm", "start" ]