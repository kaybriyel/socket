FROM redis:alpine

RUN apk add npm

WORKDIR /usr/app

COPY . /usr/app

RUN cp .env.example .env

RUN npm i

RUN npm run build

CMD node dist/server

# CMD npm run dev & cd /data && redis-server