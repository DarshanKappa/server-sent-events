const redis = require("redis");

const redisClient = redis.createClient();

function sendEventsToAll(clients, newFact) {
    clients.forEach(client => client.response.write(`data: ${newFact}\n\n`))
}

const factConsumer = async (clients) => {
    const rc = await redisClient.connect();
    await redisClient.subscribe("facts", (message, channel) => {
        console.log(message)
        // console.log(clients)
        sendEventsToAll(clients, message)
    })
}

module.exports = factConsumer;
