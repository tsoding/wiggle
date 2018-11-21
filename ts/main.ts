const tenticle = document.getElementById("tenticle");

if (tenticle !== null) {
    tenticle.addEventListener("click", () => {
        tenticle.classList.toggle("wiggle")
    })
}
