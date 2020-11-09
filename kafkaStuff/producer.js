const {Kafka} = require('kafkajs');

const msg = process.argv[2]

run()
async function run () {
    try {
        const kafka =  new Kafka({
            "clientId": "myapp",
            "brokers":["rhz.local:9092"]
        })
        const producer =  kafka.producer();
        await producer.connect()
        console.log('producer connected!')
        // A-M =0
        // N-Z = 1

        const partition = msg[0] < "N" ? 0 : 1

        const result = await producer.send({
            "topic": "Users",
            "messages": [
                {
                    "value": msg,
                    "partition": partition
                }
            ]
        })
        console.log('Send successfully! ', result);
        await producer.disconnect()
    } catch (error) {
        console.log('something went wrong! ', error);
    }
    finally {
        process.exit(0)
    }
}