const tenticle = document.getElementById("tenticle");

function wiggle() {
    if (tenticle !== null) {
        tenticle.classList.remove("wiggle");
        setTimeout(
            () => tenticle.classList.add("wiggle"),
            100
        );
    }
}

function connect() {
    let wiggleSocket = new WebSocket("ws://localhost:8080");
    wiggleSocket.onmessage = wiggle;
    wiggleSocket.onclose = connect;
}

connect();
