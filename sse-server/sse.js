
const sseEventsHandler = async (request, response, next, connectedClients) => {
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    };
    response.writeHead(200, headers);

    // Client Object
    const clientId = Date.now();
    const newClient = {
        id: clientId,
        response
    };

    // Add client in list
    connectedClients.push(newClient);

    console.log(`${clientId} Connection initiated`)

    // on close connection
    request.on('close', () => {
        console.log(`${clientId} Connection closed`);
        connectedClients = connectedClients.filter(connectedClients => connectedClients.id !== clientId);
    });
};

module.exports = sseEventsHandler;
