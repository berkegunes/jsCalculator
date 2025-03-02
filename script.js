const display = document.getElementById("calculatorDisplay");
const buttons = document.querySelectorAll("button");
const resetButton = document.getElementById("resetButton");

let currentValue = "0";
let operator = "";
let previousValue = "";
let waitingForNewValue = false;

function updateDisplay(value) {
  display.textContent = value;
}

function handleNumberClick(number) {
  if (waitingForNewValue) {
    currentValue = number;
    waitingForNewValue = false;
  } else {
    currentValue = currentValue === "0" ? number : currentValue + number;
  }
  updateDisplay(currentValue);
}

function handleOperatorClick(selectedOperator) {
  if (operator && waitingForNewValue) {
    operator = selectedOperator;
    return;
  }
  if (!previousValue) {
    previousValue = currentValue;
  } else {
    const result = calculate(previousValue, currentValue, operator);
    currentValue = result;
    previousValue = result;
    updateDisplay(result);
  }
  waitingForNewValue = true;
  operator = selectedOperator;
}

function calculate(first, second, operator) {
  const num1 = parseFloat(first);
  const num2 = parseFloat(second);
  const operations = {
    "/": (a, b) => a / b,
    "*": (a, b) => a * b,
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "=": (_, b) => b,
  };
  return operations[operator] ? operations[operator](num1, num2) : second;
}

function addDecimal() {
  if (!currentValue.includes(".")) {
    currentValue += ".";
    updateDisplay(currentValue);
  }
}

function resetCalculator() {
  currentValue = "0";
  previousValue = "";
  operator = "";
  waitingForNewValue = false;
  updateDisplay(currentValue);
}

buttons.forEach((button) => {
  if (!button.classList.length) {
    button.addEventListener("click", () => handleNumberClick(button.value));
  } else if (button.classList.contains("operator")) {
    button.addEventListener("click", () => handleOperatorClick(button.value));
  } else if (button.classList.contains("decimal")) {
    button.addEventListener("click", addDecimal);
  }
});

resetButton.addEventListener("click", resetCalculator);
