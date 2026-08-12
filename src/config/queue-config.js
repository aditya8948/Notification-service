const amqplib = require('amqplib');
const { RABBITMQ_URL } = require('./server_config');

let channel , connection;

async function connectQueue(){
    try {
        connection = await amqplib.connect(RABBITMQ_URL);
        channel = await connection.createChannel();
        await channel.assertQueue("noti-queue");

        channel.consume("noti-queue")
    } catch (error) {
        console.log(error);
    }
}

async function sendData(data){
    try {
        await channel.sendToQueue("noti-queue", Buffer.from(JSON.stringify(data)));
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    connectQueue,
    sendData

}
