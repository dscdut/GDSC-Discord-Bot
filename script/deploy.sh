#!/usr/bin/env bash

DOCKER_IMAGE="ichhoa129/discord-bot"

# Stop and remove the container
docker kill $(docker ps -q)
docker rm $(docker ps -a -q)
docker rmi $(docker images -q)

# Build the Docker image
docker build -t $DOCKER_IMAGE --build-arg MACHINE_NAME=$DOCKER_IMAGE .
docker run -p 49160:8080 -d $DOCKER_IMAGE