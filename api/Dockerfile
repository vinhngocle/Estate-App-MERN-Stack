# Use the official Node.js 20 image
FROM node:20

# Set the working directory to /app
WORKDIR /app

# Copy package.json and yarn.lock from the parent directory of docker (i.e., the api directory)
COPY ../package*.json ../yarn.lock ./

# Install dependencies inside the container
RUN yarn install --frozen-lockfile

# Copy Prisma schema and generate Prisma client
# COPY ./prisma ./prisma/
COPY ../src/prisma ./src/prisma/
RUN yarn global add prisma
RUN yarn global add @prisma/client
RUN yarn run prisma:generate
# RUN yarn run prisma:migrate
# RUN ls -la /app/node_modules/.prisma/client
# RUN prisma generate --schema=./src/prisma/schema.prisma

# Copy the rest of the application code from the parent directory of docker (i.e., the api directory)
COPY ../ ./

# RUN rm -rf node_modules

# COPY ../node_modules /app/node_modules

# Install nodemon globally
RUN yarn global add nodemon

# Rebuild bcrypt to match the Docker container's architecture
RUN yarn add bcrypt --build-from-source

# Set environment variable
ENV PORT=4000

# Expose the port the app runs on
EXPOSE 4000

# Command to run the application
CMD [ "yarn", "start:dev" ]
