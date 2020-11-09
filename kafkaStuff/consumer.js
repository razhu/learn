const {Kafka} = require('kafkajs');

run()
async function run () {
    try {
        const kafka =  new Kafka({
            "clientId": "myapp",
            "brokers":["rhz.local:9092"]
        })
        const consumer =  kafka.consumer({
            "groupId": "test"
        });
        await consumer.connect()
        console.log('consumer connected!')

        await consumer.subscribe({
            "topic": "Users",
            "fromBeginning": true
        })

        await consumer.run({
            eachMessage: async result => {
                console.log(`Msg received ${result.message.value} on partition ${result.partition}`);
            }
        })

    } catch (error) {
        console.log('something went wrong! ', error);
    }
}