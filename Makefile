include .env.dev

DOCKER_DEV=docker compose --env-file ./.env.dev -f docker-compose.dev.yml
DOCKER_EXEC=docker exec -ti $(DOCKER_APP_CONTAINER) /bin/sh 

dev:
	$(DOCKER_DEV) up --no-build

first: build start install stop

build:
	docker build --target development -t $(DOCKER_APP_IMAGE) .

install: 
	$(DOCKER_EXEC) -c "yarn install --ignore-scripts"

start:
	$(DOCKER_DEV) up -d --no-build

stop:
	$(DOCKER_DEV) stop

restart: stop dev

clear: stop
	$(DOCKER_DEV) down -v --rmi=all --remove-orphans || true

use:
	$(DOCKER_DEV)