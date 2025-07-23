# Makefile for monorepo Docker builds

CMS_IMAGE_NAME=personal-page-cms:local

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
	docker buildx build --platform linux/amd64 -f cms/Dockerfile -t personal-page-cms:prod .