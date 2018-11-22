"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var WebSocket = __importStar(require("ws"));
var wss = new WebSocket.Server({
    port: 8080
});
var sockets = [];
wss.on('connection', function (ws) {
    console.log('Connected');
    ws.on('message', function (message) {
        console.log('received: %s', message);
    });
    sockets.push(ws);
});
process.stdin.on('data', function (chunk) {
    sockets.forEach(function (ws) { return ws.send(chunk); });
});
