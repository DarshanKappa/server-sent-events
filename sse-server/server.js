const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const redis = require("redis");
const factConsumer = require('./consumers/factConsumer');
const statusHandler = require('./apis/status');
const addFactHandler = require('./apis/addFact');
const sseEventsHandler = require('./sse');

// Express
const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const clientList = {
    list: [],
    add: () => { },
    remove: () => { },
    clear: () => { },
}


let clients = [];

// Redis Consumers
factConsumer(clients);

// APIs
app.get('/status', statusHandler);

app.post('/fact', addFactHandler);

// server-sent-events route
app.get('/events', (req, res, next) => sseEventsHandler(req, res, next, clients));


// Server listening
app.listen(PORT, () => {
    console.log(`Facts Events service listening at http://localhost:${PORT}`)
});

module.exports = clients;
