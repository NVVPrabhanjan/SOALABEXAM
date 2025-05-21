FROM node:18
WORKDIR /app
COPY publisher.js .
RUN npm install amqplib
CMD ["node", "publisher.js"]
