const tenticle = document.getElementById("tenticle");

// TODO(#9): client does not handle disconnects

let wiggleSocket = new WebSocket("ws://localhost:8080");

wiggleSocket.onmessage = (ev) => {
    if (tenticle !== null) {
        tenticle.classList.remove("wiggle");
        setTimeout(() => tenticle.classList.add("wiggle"));
    }
};
