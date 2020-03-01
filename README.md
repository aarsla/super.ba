# super.ba

RSS news aggregator


Component | Stack
--- | ---
rss parser | node.js / mongodb / axios / amqplib
api | node.js / fastify / jwt / mongodb / websockets
frontend | vue / vuex / vue router / axios / jwt / websockets
amqp | rabbitmq


## Live demo

<a href="https://super.ba" target="_blank">Live demo: super.ba - news feed aggregator</a>

## Installation

1. Clone repo: `git pull https://github.com/aarsla/super.ba.git && cd super.ba`
2. add `127.0.0.1 api web mongodb` to your hosts file
3. install dependencies and create default docker .env files:
* `cd api && yarn install && cp env.dist .env`
* `cd ../parser && yarn install && cp env.dist .env`
* `cd ../web && yarn install && cp env.dist .env`
4. Start docker `docker-compose up -d`
5. Check dozzle logs at `http://localhost:9999`

Open up your browser and visit

* Frontend: `http://localhost/`
* Api swagger docs: `http://localhost:3355/documentation`
* Rabbitmq admin: `http://localhost:15672` (guest/guest)

## CLI commands

* `chmod +x docker/cli.sh`
* Help: `docker/cli.sh --help`
* Example: send random article to connected clients: `docker/cli.sh sender`

## Screenshot

![alt text][logo]

[logo]: https://raw.githubusercontent.com/aarsla/super.ba/master/screenshot.png "super.ba logo"