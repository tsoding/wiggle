import * as WebSocket from 'ws';
import * as http from 'http';
import express from 'express';

// TODO(#15): HTTP and WS Server ports are hardcoded

const PORT = 8080;
const HOST = "localhost";

const app = express();

app.use(express.static('.'));

const server = http.createServer(app);

const wss = new WebSocket.Server({server, path: "/ws"});

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

app.use('/wiggle/:name', (req, res) => {
    if (socket !== null) {
        socket.send(req.params.name);
    }

    res.send('wiggled\n');
});

server.listen(
    PORT,
    HOST,
    () => console.log(`Running HTTP server on http://${HOST}:${PORT}/`)
);
