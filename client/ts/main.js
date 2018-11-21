"use strict";
var tenticle = document.getElementById("tenticle");
var wiggleSocket = new WebSocket("ws://localhost:8080");
wiggleSocket.onmessage = function (ev) {
    if (tenticle !== null) {
        tenticle.classList.toggle("wiggle");
    }
};
