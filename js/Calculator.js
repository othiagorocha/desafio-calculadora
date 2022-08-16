export class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText
    this.currentOperationText = currentOperationText
    this.currentOperation = ''
  }

  // Add digit to calculator screen
  addDigit(digit) {
    // Check if current operation already has a dot
    if (digit === '.' && this.currentOperationText.innerText.includes('.')) {
      return
    }
    this.currentOperation = digit
    this.upgradeScreen()
  }

  //Process all calculator operations
  processOperation(operation) {
    // Check if current is empty
    if (this.currentOperationText.innerText === '' && operation !== 'C') {
      // Change operation 
      if (this.previousOperationText.innerText !== '') {
        this.changeOperation(operation)
      }
      return
    }

    let operationValue;
    const previous = +this.previousOperationText.innerText.split(" ")[0]
    const current = +this.currentOperationText.innerText

    switch (operation) {
      case '+':
        operationValue = previous + current
        this.upgradeScreen(operationValue, operation, current, previous)
        break;
      case '-':
        operationValue = previous - current
        this.upgradeScreen(operationValue, operation, current, previous)
        break;
      case '/':
        operationValue = previous / current
        this.upgradeScreen(operationValue, operation, current, previous)
        break;
      case '*':
        operationValue = previous * current
        this.upgradeScreen(operationValue, operation, current, previous)
        break;
      case 'DEL':
        this.processDelOperator()
        break;
      case 'CE':
        this.processClearCurrentOperator()
        break;
      case 'C':
        this.processClearOperator()
        break;
      case '=':
        this.processEqualOperator()
        break;

      default:
        return;
    }
    return operationValue
  }

  // Change value of the calculator screen
  upgradeScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {
    if (operationValue === null) {
      this.currentOperationText.innerText += this.currentOperation
    } else {
      // Check if value is zero, if it is just add current value
      if (previous === 0) {
        operationValue = current
      }

      // Add current values to previous
      this.previousOperationText.innerText = `${operationValue} ${operation}`
      this.currentOperationText.innerText = ''
    }
  }

  // Change math operation
  changeOperation(operation) {
    const mathOperations = ['+', '-', '*', '/']
    if (!mathOperations.includes(operation)) {
      return
    }

    this.previousOperationText.innerText =
      this.previousOperationText.innerText.slice(0, -1) + operation
  }

  // Delete the last digit
  processDelOperator() {
    this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1)
  }

  // Clear current operation
  processClearCurrentOperator() {
    this.currentOperationText.innerText = ''
  }

  // Clear all operations
  processClearOperator() {
    this.currentOperationText.innerText = ''
    this.previousOperationText.innerText = ''
  }

  // Process an operation
  processEqualOperator() {
    const operation = this.previousOperationText.innerText.split(' ')[1]
    this.processOperation(operation)

  }

}
