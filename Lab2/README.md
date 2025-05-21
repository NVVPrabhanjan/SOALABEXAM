# 📊 SOA Lab 2: Asynchronous Messaging with RabbitMQ and Node.js

## 🛠️ Setup RabbitMQ

Run RabbitMQ using Docker:

```bash
docker run -d --hostname rabbit --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```

## 📁 Project Structure

```
soa-lab-2/
├── publisher/
│   ├── publisher.js
│   └── Dockerfile
├── consumer/
│   ├── consumer.js
│   └── Dockerfile
└── docker-compose.yml
```

## 🔧 Install Node Packages

```bash
npm init -y
npm install amqplib
```

---

## 📰 Publisher Code (`publisher/publisher.js`)

```javascript
import { connect } from 'amqplib';

async function publishMessage() {
    const queue = 'orders';
    const message = { orderId: 123, item: 'Laptop', quantity: 1 };

    const connection = await connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertQueue(queue);
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));

    console.log('Message sent:', message);
    setTimeout(() => {
        connection.close();
        process.exit(0);
    }, 500);
}

publishMessage().catch(console.error);
```

### 📅 Publisher Dockerfile (`publisher/Dockerfile`)

```dockerfile
FROM node:18
WORKDIR /app
COPY publisher.js .
RUN npm install amqplib
CMD ["node", "publisher.js"]
```

---

## 📢 Consumer Code (`consumer/consumer.js`)

```javascript
import { connect } from 'amqplib';

async function consumeMessages() {
    const queue = 'orders';

    const connection = await connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertQueue(queue);

    console.log('Waiting for messages...');
    channel.consume(queue, msg => {
        if (msg !== null) {
            const message = JSON.parse(msg.content.toString());
            console.log('Received:', message);
            // You can store this in DB or trigger further processing
            channel.ack(msg);
        }
    });
}

consumeMessages().catch(console.error);
```

### 📅 Consumer Dockerfile (`consumer/Dockerfile`)

```dockerfile
FROM node:18
WORKDIR /app
COPY consumer.js .
RUN npm install amqplib
CMD ["node", "consumer.js"]
```

---

## 📝 Docker Compose (`docker-compose.yml`)

```yaml
version: '3.8'
services:
  rabbitmq:
    image: rabbitmq:3-management
    ports:
      - "5672:5672"
      - "15672:15672"
    environment:
      RABBITMQ_DEFAULT_USER: guest
      RABBITMQ_DEFAULT_PASS: guest

  publisher:
    build: ./publisher
    depends_on:
      - rabbitmq

  consumer:
    build: ./consumer
    depends_on:
      - rabbitmq
```

---

## 🚀 Run the Services

```bash
docker-compose up --build
```

---

## 🔐 RabbitMQ Management UI

Access the management UI:

* URL: [http://localhost:15672](http://localhost:15672)
* Username: `guest`
* Password: `guest`

---