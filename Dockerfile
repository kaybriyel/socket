FROM redis:alpine

RUN apk add npm

WORKDIR /usr/app

COPY . /usr/app

RUN cp .env.example .env

RUN npm i

CMD npm run dev & cd /data && redis-server