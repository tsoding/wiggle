import * as WebSocket from 'ws';
import express from 'express';

// TODO(#15): HTTP and WS Server ports are hardcoded

const http = express();

http.use(express.static('.'));

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

http.use('/wiggle', (req, res) => {
    sockets.forEach((ws) => ws.send('wiggle'));
    res.send('wiggled\n');
});

http.listen(8081, () => console.log("Running HTTP server on http://localhost:8081/"))
