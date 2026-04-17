function normalise(str) { // Normalise input so lowercase allowed and no spaces required
    return str.toLowerCase().replace(/[^a-z0-9]/g, "");
}

let total = Object.keys(answers).length;
let score = 0;
document.getElementById("score").textContent = `${score} / ${total}`;

function sleep(ms) { // Goofy sleep function
  return new Promise(resolve => setTimeout(resolve, ms));
}

document.getElementById("input").addEventListener("input", function () {
    let guess = normalise(this.value);

    if (answers[guess]) {
        let id = answers[guess];
        let els = document.getElementsByClassName(id);
        if (els) {
            for (let el of els) {
                el.classList.add("correct");
            }
        }
        delete answers[guess];
        score++;
        document.getElementById("score").textContent = `${score} / ${total}`;
        this.value = "";
    }

    if (score == total) {
        youwon();
    }
});

const sticky = document.getElementById("answer-box"); // Get the sticky element

function updateViewport() { // Update sticky element position function
    const viewport = window.visualViewport;
    const offsetTop = window.innerHeight - viewport.height - viewport.offsetTop; // somehow this calculates offset nicely
    sticky.style.transform = `translateY(-${offsetTop}px)`; // set sticky element position
}

// Event listeners checking if resize or scroll occurred
window.visualViewport?.addEventListener("resize", updateViewport); // ? checks if visualViewport exists (because check is actually in the function)
window.visualViewport?.addEventListener("scroll", updateViewport);