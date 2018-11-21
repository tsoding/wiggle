const tenticle = document.getElementById("tenticle");

let wiggleSocket = new WebSocket("wss://echo.websocket.org");
wiggleSocket.onmessage = (ev) => {
    console.log("Recieved data: " + ev.data);
};

if (tenticle !== null) {
    tenticle.addEventListener("click", () => {
        tenticle.classList.toggle("wiggle");
        wiggleSocket.send("Pepega");
    })
}
