
const statusHandler = async (request, response) => {
    return response.json({ clients: clients.length })
}

module.exports = statusHandler;
