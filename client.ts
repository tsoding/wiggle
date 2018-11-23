const root = document.getElementById("root");
const tenticle = document.getElementById("tenticle");

function shootName(nameString: string): void {
    if (root === null) {
        return;
    }

    const name = document.createElement("div");
    name.textContent = nameString;
    name.classList.add("name");
    name.classList.add("fade");
    root.appendChild(name);

    setTimeout(() => root.removeChild(name), 900);
}

function wiggle(ev: MessageEvent): void {
    if (tenticle === null) {
        return;
    }

    tenticle.classList.remove("wiggle");
    setTimeout(
        () => {
            shootName(ev.data);
            tenticle.classList.add("wiggle")
        },
        100
    );
}

function connect(): void {
    let wiggleSocket = new WebSocket("ws://localhost:8080");
    wiggleSocket.onmessage = wiggle;
    wiggleSocket.onclose = connect;
}

connect();
