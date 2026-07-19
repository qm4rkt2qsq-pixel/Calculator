const screen = document.getElementById("screen");
const buttons = document.querySelectorAll(".calc-button");

let currentNumber = "0";
let firstNumber = null;
let operator = null;
let waitingForSecondNumber = false;

updateScreen();

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const value = button.dataset.value;

        if (!isNaN(value)) {
            inputNumber(value);
        } else if (value === "C") {
            clearCalculator();
        } else if (value === "backspace") {
            deleteLast();
        } else if (value === "=") {
            calculate();
        } else {
            handleOperator(value);
        }

        updateScreen();
    });
});

function updateScreen() {
    screen.textContent = currentNumber;
}

function inputNumber(number) {
    if (waitingForSecondNumber) {
        currentNumber = number;
        waitingForSecondNumber = false;
        return;
    }

    if (currentNumber === "0") {
        currentNumber = number;
    } else {
        currentNumber += number;
    }
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(currentNumber);

    if (firstNumber === null) {
        firstNumber = inputValue;
    } else if (!waitingForSecondNumber) {
        firstNumber = performCalculation(firstNumber, inputValue, operator);
        currentNumber = String(firstNumber);
    }

    operator = nextOperator;
    waitingForSecondNumber = true;
}

function calculate() {
    if (operator === null || waitingForSecondNumber) {
        return;
    }

    const secondNumber = parseFloat(currentNumber);

    const result = performCalculation(firstNumber, secondNumber, operator);

    currentNumber = String(result);
    firstNumber = null;
    operator = null;
    waitingForSecondNumber = false;
}

function performCalculation(first, second, operator) {
    switch (operator) {
        case "+":
            return first + second;

        case "-":
            return first - second;

        case "*":
            return first * second;

        case "/":
            return second === 0 ? "Error" : first / second;

        default:
            return second;
    }
}

function clearCalculator() {
    currentNumber = "0";
    firstNumber = null;
    operator = null;
    waitingForSecondNumber = false;
}

function deleteLast() {
    if (waitingForSecondNumber) return;

    currentNumber = currentNumber.length > 1
        ? currentNumber.slice(0, -1)
        : "0";
}