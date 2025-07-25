#!/bin/bash

# Deploy Frontend to ECR
set -e

# Load AWS configuration
if [ -f ".env.aws" ]; then
    echo "📋 Loading AWS configuration from .env.aws..."
    source .env.aws
else
    echo "❌ .env.aws file not found!"
    exit 1
fi

# Configuration
LOCAL_IMAGE_NAME="personal-page-frontend:prod"

echo "🚀 Starting Frontend deployment to ECR..."

# 1. Get ECR login token
echo "📝 Getting ECR login token..."
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

# 2. Build the production image
echo "🔨 Building production Docker image..."
make build-fe-prod

# 3. Tag the image for ECR
ECR_IMAGE_URI="$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY_FRONTEND:$IMAGE_TAG"
echo "🏷️  Tagging image as: $ECR_IMAGE_URI"
docker tag $LOCAL_IMAGE_NAME $ECR_IMAGE_URI

# 4. Push to ECR
echo "⬆️  Pushing image to ECR..."
docker push $ECR_IMAGE_URI

echo "✅ Frontend successfully deployed to ECR!"
echo "📍 Image URI: $ECR_IMAGE_URI"
echo "🌐 Repository: https://$AWS_REGION.console.aws.amazon.com/ecr/repositories/$ECR_REPOSITORY_FRONTEND" 