#!/usr/bin/env bash

DOCKER_IMAGE="ichhoa129/discord-bot"

git pull

# Stop and remove the container
docker kill gdsc_discord
docker rm gdsc_discord
docker rmi $DOCKER_IMAGE

# Build the Docker image
docker build -t $DOCKER_IMAGE --build-arg MACHINE_NAME=$DOCKER_IMAGE .
docker run -p 49160:8080 --name gdsc_discord -d $DOCKER_IMAGE