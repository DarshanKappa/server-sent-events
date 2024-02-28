const redis = require("redis");

// Redis
const redisClient = redis.createClient();

// Redis on Error
redisClient.on("error", (e) => {
    console.log('--------Error-----------')
    console.log(e)
});

const addFactHandler = async (request, respsonse, next) => {
    const newFact = request.body;

    // send to redis queue | channel: facts
    await redisClient.connect();
    await redisClient.publish("facts", JSON.stringify(newFact));
    await redisClient.quit();

    return respsonse.json(newFact)
};

module.exports = addFactHandler;
