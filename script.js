let blue;
let red;
let green;
let userRed = 0;
let userGreen = 0;
let userBlue = 0;

generateColor();
const userInputs = document.querySelectorAll("input");
userInputs.forEach((input) => {
  input.addEventListener("input", updateColor);
});

document.getElementById(
  "mixed-color"
).style.backgroundColor = `rgb(${userRed}, ${userGreen}, ${userBlue})`;

document.getElementById("check-button").addEventListener("click", checkColor);

function checkColor() {
  const result = calculate();
  document.getElementById("feedback").style.display = "none";
  if (result > 85) {
    document.getElementById("perc").textContent = result.toFixed(1) + "%";
    document.querySelector(".container").classList.add("message-background");
    const m = document.getElementById("message");
    m.classList.add("show");
    m.classList.remove("hide");
    m.style.visibility = "visible";
    document.getElementById("correct").play();

    setTimeout(() => {
      document.addEventListener("click", function removeMessage() {
        m.classList.remove("show");
        m.classList.add("hide");
        setTimeout(() => {
          m.style.visibility = "hidden";
          generateColor();
          updateColor();
        }, 500);
        document
          .querySelector(".container")
          .classList.remove("message-background");
        document.removeEventListener("click", removeMessage);
      });
    }, 100);
    document.getElementById("red").value = 0;
    document.getElementById("green").value = 0;
    document.getElementById("blue").value = 0;
  } else {
    document.getElementById("feedback").style.display = "block";
    setTimeout(() => {
      document.getElementById("feedback").style.display = "none";
    }, 5000);
  }
}

function calculate() {
  const redDiff = red - userRed;
  const greenDiff = green - userGreen;
  const blueDiff = blue - userBlue;
  const distance = Math.sqrt(
    redDiff * redDiff + greenDiff * greenDiff + blueDiff * blueDiff
  );
  const maxDistance = Math.sqrt(255 * 255 + 255 * 255 + 255 * 255);
  const normilized = distance / maxDistance;
  return (1 - normilized) * 100;
}

function updateColor() {
  userRed = Number(document.getElementById("red").value);
  userGreen = document.getElementById("green").value;
  userBlue = document.getElementById("blue").value;
  document.getElementById(
    "mixed-color"
  ).style.backgroundColor = `rgb(${userRed}, ${userGreen}, ${userBlue})`;
}

function generateColor() {
  red = Math.floor(Math.random() * 256);
  green = Math.floor(Math.random() * 256);
  blue = Math.floor(Math.random() * 256);
  document.getElementById(
    "target-color"
  ).style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}
