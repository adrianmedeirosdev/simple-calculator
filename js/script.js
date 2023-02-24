const display = document.querySelector('#display')
const numbers = document.querySelectorAll('.buttons-container .number')
const operations = document.querySelectorAll('.buttons-container .operation')
const btnEqual = document.querySelector('#equal-btn')
const btnC = document.querySelector('#btn-c')
const btnDEL = document.querySelector('#btn-del')

let currentValue = 0
let previousValue
let operation


function handleDigits(digit) {
  if (digit == '.' && display.innerText.includes(".")) {
    return;
  }
  if (display.innerText == 0) {
    display.innerText = digit
  } else {
    display.innerText += digit
  }
  currentValue = +display.innerText
}

function handleOperations(operationInput) {
  operation = operationInput
  previousValue = currentValue
  currentValue = 0
  display.innerText = ""
}

function calculate(actualOperation) {
  operations.forEach(operation => {
    operation.classList.remove('operation-active')
  })
  switch (actualOperation) {
    case '+':
      currentValue = sum(previousValue, currentValue)
      display.innerText = currentValue
      break;
    case '-':
      currentValue = sub(previousValue, currentValue)
      display.innerText = currentValue
      break;
    case '*':
      currentValue = mult(previousValue, currentValue)
      display.innerText = currentValue
      break;
    case '/':
      currentValue = div(previousValue, currentValue)
      display.innerText = currentValue
      break;
    default:
      return;
  }
}

numbers.forEach(num => {
  num.addEventListener('click', (e) => {
    const value = e.target.innerText
    handleDigits(value)
  })
})

operations.forEach(op => {
  op.addEventListener('click', (e) => {
    const value = e.target.innerText
    handleOperations(value)
  })


})

btnEqual.addEventListener('click', () => calculate(operation))
btnC.addEventListener('click', () => clearAll());
btnDEL.addEventListener('click', () => del());


function sum(previousValue, currentValue) {
  return previousValue + currentValue
}

function sub(previousValue, currentValue) {
  return previousValue - currentValue
}

function div(previousValue, currentValue) {
  return previousValue / currentValue
}

function mult(previousValue, currentValue) {
  return previousValue * currentValue
}

function clearAll() {
  previousValue = 0
  currentValue = 0
  operation = ""
  display.innerText = 0
}

function del() {
  if (display.innerText.length > 1) {
    display.innerText = display.innerText.slice(0, -1)
  } else {
    display.innerText = 0
  }
}

