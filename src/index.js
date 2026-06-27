const express = require("express");
const amqplib = require('amqplib');
const {EmailService} = require('./services')

async function connectQueue(){
    try {
        const connection = await amqplib.connect("amqp://localhost");
        const channel = await connection.createChannel();
        await channel.assertQueue("noti-queue", { durable: true });

        console.log("Notification consumer listening on noti-queue...");

        channel.consume("noti-queue", async (data) => {
            try {
                const object = JSON.parse(Buffer.from(data.content).toString());
                console.log("Received queue message:", object);

                await EmailService.sendMail(
                    "airlinenoti@gmail.com",
                    object.recipientEmail,
                    object.subject,
                    object.text
                );

                channel.ack(data);
                console.log("Email send handled successfully");
            } catch (error) {
                console.error("Failed to process queue message:", error);
                channel.nack(data, false, true);
            }
        }, { noAck: false });
    } catch (error) {
        console.error("RabbitMQ consumer setup failed:", error);
    }
}



const {serverConfig, Logger } = require("./config");
const app = express();

const apiRoutes = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api' , apiRoutes)


app.listen(serverConfig.PORT , async() => {
    console.log(`Server is running on port ${serverConfig.PORT}`);
    Logger.info("succesfully started the server ", "root", {})
    await connectQueue();
}); 
 
