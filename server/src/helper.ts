import { consumer, producer } from "./config/kafka.config.js"

export const produceMessages = async (topic: string, message: any) => {
    await producer.send({
        topic: topic,
        messages: [
            { value: JSON.stringify(message) }
        ]
    })
}

export const consumeMessages = async (topic: string) => {
    await consumer.connect()
    await consumer.subscribe({ topic: topic, fromBeginning: true })
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const raw = message.value?.toString();
            const data = JSON.parse(raw);
            console.log(data)

            //insert into db
        }
    })
}