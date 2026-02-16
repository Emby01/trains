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
        let el = document.getElementById(id);
        if (el) el.classList.add("correct");
        delete answers[guess];
        score++;
        document.getElementById("score").textContent = `${score} / ${total}`;
        this.value = "";
    }

    if (score == total) {
        youwon();
    }
});