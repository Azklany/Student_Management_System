const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Client connected.');

    ws.on('message', (message) => {
        const { type, data } = JSON.parse(message);

        if (type === 'add_student') {
            // Broadcast the received data to all clients
            const update = { type: 'update_table', data };

            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(update));
                }
            });

            console.log('Broadcasted:', update);
        }
    });

    ws.on('close', () => console.log('Client disconnected.'));
});

console.log('WebSocket server running on ws://localhost:8080');
