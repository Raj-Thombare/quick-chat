import { Kafka, logLevel } from "kafkajs";
import fs from 'fs';

const caPath =
    process.env.NODE_ENV === "production"
        ? "/etc/secrets/ca.pem"
        : "./ca.pem";

export const kafka = new Kafka({
    clientId: "quick-chat",
    brokers: [process.env.KAFKA_BROKER],
    ssl: {
        ca: [fs.readFileSync(caPath, "utf-8")]
    },
    sasl: {
        mechanism: "plain",
        username: process.env.KAFKA_USERNAME,
        password: process.env.KAFKA_PASSWORD,
    },
    logLevel: logLevel.ERROR
});
console.log(caPath)
export const producer = kafka.producer();
export const consumer = kafka.consumer({
    groupId: "chats"
});

export const connectKafkaProducer = async () => {
    await producer.connect();
    console.log('Kafka producer connected!')
}

