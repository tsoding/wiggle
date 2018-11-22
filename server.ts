import * as WebSocket from 'ws';
import express from 'express';

// TODO(#15): HTTP and WS Server ports are hardcoded

const http = express();

http.use(express.static('.'));

const wss = new WebSocket.Server({
    port: 8080
});

// TODO: server supports only a single connection
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

http.use('/wiggle', (req, res) => {
    if (socket !== null) {
        socket.send('wiggle');
        res.send('wiggled\n');
    }
});

http.listen(
    8081,
    "localhost",
    () => console.log("Running HTTP server on http://localhost:8081/")
)
