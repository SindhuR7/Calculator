let display = document.querySelector(".display")
const allClear = document.querySelector("#clear")
const erase = document.querySelector("#erase")
let currentInput ="";
const clickToDisplay = (value) => {
    currentInput += value;
    display.textContent = currentInput;
}