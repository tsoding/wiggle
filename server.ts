import * as WebSocket from 'ws';
import express from 'express';

// TODO(#15): HTTP and WS Server ports are hardcoded

const WS_PORT = 8080;
const REST_PORT = 8081;

const http = express();

http.use(express.static('.'));

const wss = new WebSocket.Server({
    port: WS_PORT
});

// TODO(#18): server supports only a single connection
let socket: any = null;

wss.on('connection', (ws) => {
    console.log('Connected');

    ws.on('message', (message) => {
        console.log('received: %s', message);
    });

    ws.on('close', (code, reason) => {
        socket = null;
        console.log(`Socket disconnected: Code ${code}, Reason: ${reason}`);
    });

    socket = ws;
});

http.use('/wiggle/:name', (req, res) => {
    if (socket !== null) {
        socket.send(req.params.name);
    }

    res.send('wiggled\n');
});

http.listen(
    REST_PORT,
    "localhost",
    () => console.log(`Running HTTP server on http://localhost:${REST_PORT}/`)
)
