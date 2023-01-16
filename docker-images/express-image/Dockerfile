FROM node:18


RUN apt-get update && \
  apt-get install -y vim

COPY src /opt/app/
WORKDIR /opt/app/

RUN npm install

EXPOSE 3000

CMD ["node", "index.js"]
