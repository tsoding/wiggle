import * as WebSocket from 'ws';

const wss = new WebSocket.Server({
    port: 8080
});

let sockets: any[] = [];

// TODO(#10): server does not handle disconnects
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

// TODO(#13): Server does not serve the content via HTTP
// TODO(#11): Server does not accept REST API calls to trigger the wiggle on the client
