# Use the official Node.js 20 image
FROM node:20

# Set the working directory to /app
WORKDIR /app

# Copy package.json and yarn.lock from the parent directory of docker (i.e., the api directory)
COPY ../package*.json ../yarn.lock ./

# Install dependencies inside the container
RUN yarn install --frozen-lockfile

# Install nodemon globally
COPY ../ ./

# Set environment variable
RUN yarn global add nodemon

# Rebuild bcrypt to match the Docker container's architecture
RUN yarn add bcrypt --build-from-source

# Set environment variable
ENV PORT=5000

# Expose the port the app runs on
EXPOSE 5000

# Command to run the application
CMD [ "yarn", "start:dev" ]