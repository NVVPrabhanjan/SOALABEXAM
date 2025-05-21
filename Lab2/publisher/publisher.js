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
