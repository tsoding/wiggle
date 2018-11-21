"use strict";
var tenticle = document.getElementById("tenticle");
if (tenticle !== null) {
    tenticle.addEventListener("click", function () {
        tenticle.classList.toggle("wiggle");
    });
}
