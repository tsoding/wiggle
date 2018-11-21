const tenticle = document.getElementById("tenticle");

let wiggleSocket = new WebSocket("ws://localhost:8080");

wiggleSocket.onmessage = (ev) => {
    if (tenticle !== null) {
        tenticle.classList.toggle("wiggle");
    }
};
