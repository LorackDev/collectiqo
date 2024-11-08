#!/bin/bash

DOCKER_USERNAME="lorackdev"

# Creating buildx container...
docker buildx create --use --name multiarch_builder
docker buildx inspect --bootstrap

# Buildx container successfully built

# Building MySQL container...
# Set variables
IMAGE_NAME="$DOCKER_USERNAME/clq-mysql-multiarch:latest"

# Build and push multi-platform image
docker buildx build --platform linux/amd64,linux/arm64/v8 \
    -t "$IMAGE_NAME" \
    -f MySQL.Dockerfile \
    --push .

echo "Build and push completed for $IMAGE_NAME"

# Building node container...
# Set the image name
IMAGE_NAME="$DOCKER_USERNAME/clq-node-multiarch:latest"

# Build and push the multi-platform image
docker buildx build --platform linux/amd64,linux/arm64/v8 \
    -t "$IMAGE_NAME" \
    -f Dockerfile \
    --push .

echo "Build and push completed for $IMAGE_NAME"

# Cleaning up...
docker buildx rm multiarch_builder

