import * as WebSocket from 'ws';

const wss = new WebSocket.Server({
    port: 8080
});

let sockets: any[] = [];

wss.on('connection', (ws) => {
    console.log('Connected');

    ws.on('message', (message) => {
        console.log('received: %s', message);
    });

    sockets.push(ws)
});

process.stdin.on('data', (chunk) => {
    sockets.forEach((ws) => ws.send(chunk))
});
