FROM ghcr.io/downunderctf/docker-vendor/nsjail:debian-10 AS nsjail

FROM node:16.17.0

COPY --from=nsjail /docker-init /docker-init
COPY --from=nsjail /usr/bin/nsjail /usr/bin/
RUN useradd -r -m ctf

ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    libprotobuf17 libnl-route-3-200  && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY challenge/package*.json ./

RUN npm install

COPY ./challenge .

RUN mkdir /mounts && mkdir /storage
RUN mkdir /flag && mv ./flag.txt /flag/

ENTRYPOINT ["/docker-init/docker-entrypoint.sh"]
CMD [ "node", "index.js" ]
