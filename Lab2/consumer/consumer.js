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
