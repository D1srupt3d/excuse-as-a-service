# eaas

excuse as a service. get random excuses for literally anything

100+ excuses and counting

[![Security Audit](https://github.com/d1srupt3d/excuse-as-a-service/actions/workflows/security.yml/badge.svg)](https://github.com/d1srupt3d/excuse-as-a-service/actions/workflows/security.yml)
[![Build and Push Docker Image](https://github.com/d1srupt3d/excuse-as-a-service/actions/workflows/build.yml/badge.svg)](https://github.com/d1srupt3d/excuse-as-a-service/actions/workflows/build.yml)

## install

```bash
npm install -g eaas
```

or just clone it

```bash
git clone https://github.com/d1srupt3d/excuse-as-a-service.git
cd eaas
npm install
```

### docker

**Local build:**

```bash
docker-compose up -d
```

or

```bash
docker build -t eaas .
docker run -p 3000:3000 eaas
```

**Use pre-built image from GitHub Container Registry:**

```bash
docker pull ghcr.io/d1srupt3d/excuse-as-a-service:latest
docker run -p 3000:3000 ghcr.io/d1srupt3d/excuse-as-a-service:latest
```

or with docker-compose:

```yaml
services:
  eaas:
    image: ghcr.io/d1srupt3d/excuse-as-a-service:latest
    ports:
      - "3000:3000"
    restart: unless-stopped
```

**Available tags:**
- `latest` - Latest build from main branch
- `main-<sha>` - Specific commit builds
- `v*` - Version tags (e.g., `v1.0.0`)

The Docker image is automatically built and pushed to [GitHub Container Registry](https://github.com/d1srupt3d/excuse-as-a-service/pkgs/container/excuse-as-a-service) on every push to main.

## usage

just run it

```bash
eaas
```

or start the api

```bash
npm start
```

runs on port 3000

### api endpoints

- `GET /excuse` - random excuse
- `GET /excuses` - all of them
- `GET /count` - how many there are
- `GET /health` - health check
- `GET /stats` - api stats

### examples

```bash
$ eaas

🎭 Your Excuse:
   "stuck in a zoom meeting"
```

```bash
curl localhost:3000/excuse
```

## use it in your code

```javascript
const fs = require('fs');
const excuses = JSON.parse(fs.readFileSync('./excuses.json', 'utf-8'));
const random = excuses[Math.floor(Math.random() * excuses.length)];
```

## add more excuses

just edit excuses.json and add whatever

## contributing

prs welcome. just add funny excuses

see [CONTRIBUTING.md](CONTRIBUTING.md) for details

## license

MIT do whatever

