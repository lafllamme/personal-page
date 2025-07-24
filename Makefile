# Makefile for monorepo Docker builds

CMS_IMAGE_NAME=personal-page-cms:local
CMS_IMAGE_NAME_PROD=personal-page-cms:prod
FE_IMAGE_NAME=personal-page-frontend:local
FE_IMAGE_NAME_PROD=personal-page-frontend:prod

.PHONY: build-cms
build-cms:
	docker build -f cms/Dockerfile -t $(CMS_IMAGE_NAME) .

.PHONY: run-cms
run-cms:
	docker run --rm -it -p 3001:3001 --env-file=cms/.env $(CMS_IMAGE_NAME) 

.PHONY: upp-cms
upp-cms: 
	make build-cms && make run-cms

.PHONY: build-cms-prod
build-cms-prod:
	docker buildx build --platform linux/amd64 -f cms/Dockerfile -t $(CMS_IMAGE_NAME_PROD) .

.PHONY: build-fe
build-fe:
	docker build -f frontend/Dockerfile -t $(FE_IMAGE_NAME) .

.PHONY: run-fe
run-fe:
	docker run --rm -it -p 3000:3000 --env-file=frontend/.env $(FE_IMAGE_NAME)

.PHONY: upp-fe
upp-fe:
	make build-fe && make run-fe

.PHONY: build-fe-prod
build-fe-prod:
	docker buildx build --platform linux/amd64 -f frontend/Dockerfile -t $(FE_IMAGE_NAME_PROD) .