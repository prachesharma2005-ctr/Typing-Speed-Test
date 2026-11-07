
const sentences = [
    "Learning web development is a great way to build creative and useful websites.",
    "JavaScript makes websites interactive and helps developers create amazing projects.",
    "Practice every day and improve your coding skills to become a better developer.",
    "Success comes from hard work, patience, and learning something new every day."
];

const textDisplay = document.getElementById("textDisplay");
const inputArea = document.getElementById("inputArea");
const timer = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");

const wpm = document.getElementById("wpm");
const accuracy = document.getElementById("accuracy");
const correct = document.getElementById("correct");
const errors = document.getElementById("errors");
const message = document.getElementById("message");

let currentText = "";
let timeLeft = 60;
let timerInterval;
let isRunning = false;

function startTest() {

    clearInterval(timerInterval);


    let randomIndex = Math.floor(Math.random() * sentences.length);

    currentText = sentences[randomIndex];


    timeLeft = 60;
    isRunning = true;

    inputArea.value = "";
    inputArea.disabled = false;
    inputArea.maxLength = currentText.length;

    timer.innerText = "60s";

    wpm.innerText = "0";
    accuracy.innerText = "0%";
    correct.innerText = "0";
    errors.innerText = "0";

    message.innerText = "";

    startBtn.innerText = "Restart Test";

    displayText();


    inputArea.focus();


    timerInterval = setInterval(function () {

        timeLeft--;

        timer.innerText = timeLeft + "s";

        if (timeLeft <= 0) {
            finishTest();
        }

    }, 1000);
}

function displayText() {

    textDisplay.innerHTML = "";

    currentText.split("").forEach(function (character, index) {

        let span = document.createElement("span");

        span.innerText = character;

        if (index === 0) {
            span.classList.add("current-char");
        }

        textDisplay.appendChild(span);

    });

}

inputArea.addEventListener("input", function () {

    if (!isRunning) return;

    let typedText = inputArea.value;

    let spans = textDisplay.querySelectorAll("span");

    let correctCount = 0;
    let errorCount = 0;

    spans.forEach(function (span, index) {

        let typedCharacter = typedText[index];
        let originalCharacter = currentText[index];

        span.classList.remove(
            "correct-char",
            "wrong-char",
            "current-char"
        );

        if (typedCharacter == null) {

            if (index === typedText.length) {
                span.classList.add("current-char");
            }

        } else if (typedCharacter === originalCharacter) {

            span.classList.add("correct-char");
            correctCount++;

        } else {

            span.classList.add("wrong-char");
            errorCount++;

        }

    });

    let totalTyped = typedText.length;

    let accuracyValue = totalTyped > 0
        ? Math.round((correctCount / totalTyped) * 100)
        : 0;


    let elapsedTime = 60 - timeLeft;

    let wpmValue = elapsedTime > 0
        ? Math.round((correctCount / 5) / (elapsedTime / 60))
        : 0;

    wpm.innerText = wpmValue;
    accuracy.innerText = accuracyValue + "%";
    correct.innerText = correctCount;
    errors.innerText = errorCount;


    if (typedText === currentText) {
        finishTest();
    }

});

function finishTest() {

    clearInterval(timerInterval);

    isRunning = false;

    inputArea.disabled = true;

    message.innerText = "Test Completed! Great Job!";

    startBtn.innerText = "Try Again";

}


startBtn.addEventListener("click", startTest);
