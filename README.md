# Estate-App-MERN-Stack
# MERN Stack App & Real-time Chat

# config env
- PORT
- MONGO_URL
- JWT_SECRET_KEY
- EMAIL_HOST
- PASSWORD_EMAIL_HOST
- BASE_URL

# random key for jwt_serect_key
- openssl rand -base64 32

# docker
- docker build -f docker/Dockerfile -t your-image-name .
- docker run -p PORT:8080 your-image-name

- ex:
    -  docker build -t academy-app .
    -  docker run -p PORT:8080 academy-app:latest

# run docker
- install docker
- docker build -f docker/Dockerfile -t your-image-name .
- docker-compose up


# run project
- yarn install
- yarn run start:dev
