import { Calculator } from "./Calculator.js"

const previousOperationText = document.querySelector('#previous-operation')
const currentOperationText = document.querySelector('#current-operation')
const buttons = document.querySelectorAll('#buttons-container button')

const calc = new Calculator(previousOperationText, currentOperationText)

buttons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const value = e.target.innerText
    if (+value >= 0 || value === '.') {
      calc.addDigit(value)
    } else {
      calc.processOperation(value)
    }
  })
})