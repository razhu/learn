const {Kafka} = require('kafkajs');

run()
async function run () {
    try {
        const kafka =  new Kafka({
            "clientId": "myapp",
            "brokers":["rhz.local:9092"]
        })
        const admin =  kafka.admin();
        console.log('connecting...');
        await admin.connect
        console.log('connected :]');

        await admin.createTopics({
            "topics": [{
                "topic": "Users",
                "numPartitions": 2
            }]
        })
        console.log('done!')
        await admin.disconnect()
    } catch (error) {
        console.log('something went wrong! ', error);
    }
    finally {
        process.exit(0)
    }
}