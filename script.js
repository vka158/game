let balance = 1000;
const wheel = document.getElementById("wheel");
const balanceDisplay = document.getElementById("balance");
const resultDisplay = document.getElementById("result");
const betInput = document.getElementById("bet");
const betType = document.getElementById("betType");
const numberPick = document.getElementById("numberPick");

let winSound = new Audio("assets/win.mp3");
let spinSound = new Audio("assets/spin.mp3");
let loseSound = new Audio("assets/lose.mp3");

betType.addEventListener("change", () => {
  numberPick.style.display = betType.value === "number" ? "inline-block" : "none";
});

function spinWheel() {
  const betAmount = parseInt(betInput.value);
  const selectedType = betType.value;
  const selectedNumber = parseInt(numberPick.value);

  if (betAmount > balance || betAmount <= 0) {
    alert("Invalid bet amount.");
    return;
  }

  const spinDeg = Math.floor(Math.random() * 360 + 720);
  wheel.style.transform = `rotate(${spinDeg}deg)`;
  spinSound.play();

  const resultNumber = Math.floor(Math.random() * 37); // 0–36
  const isRed = resultNumber % 2 !== 0 && resultNumber !== 0;
  const isBlack = resultNumber % 2 === 0 && resultNumber !== 0;

  setTimeout(() => {
    let won = false;
    let reward = 0;

    if (selectedType === "red" && isRed) {
      won = true; reward = betAmount;
    } else if (selectedType === "black" && isBlack) {
      won = true; reward = betAmount;
    } else if (selectedType === "odd" && resultNumber % 2 === 1) {
      won = true; reward = betAmount;
    } else if (selectedType === "even" && resultNumber !== 0 && resultNumber % 2 === 0) {
      won = true; reward = betAmount;
    } else if (selectedType === "number" && resultNumber === selectedNumber) {
      won = true; reward = betAmount * 35;
    }

    if (won) {
      balance += reward;
      resultDisplay.innerText = `🎉 You won! Number: ${resultNumber} | +$${reward}`;
      winSound.play();
    } else {
      balance -= betAmount;
      resultDisplay.innerText = `❌ You lost! Number: ${resultNumber} | -$${betAmount}`;
      loseSound.play();
    }

    balanceDisplay.innerText = balance;
  }, 3000);
}
