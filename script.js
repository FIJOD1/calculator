

class calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

clear() {
this.currentOperand = ""
this.previousOperand = ""
this.operation = undefined
}

delete() {
this.currentOperand = this.currentOperand.toString().slice(0, -1)
}

appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    if (number === '-' && this.currentOperand.includes('-')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()

}

chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
        this.compute()
    }
this.operation = operation
this.previousOperand = this.currentOperand
this.currentOperand = ''
}


compute() {
let computation
const previous = parseFloat(this.previousOperand)
const current = parseFloat(this.currentOperand)
if (isNaN(previous) || isNaN(current)) return
switch(this.operation) {
    case '+' :
        computation = previous + current
        break
    case '-' :
            computation = previous - current
            break
    case 'x' :
                computation = previous * current
                break
    case '/' :
                    computation = previous / current
                    break
   case '%' :
                 computation = (previous / 100) * current
                  break
   case '^' :
                    computation = previous ** current

                    break
    case '(' :
                 computation = previous * current
                 break
    case ')' :
                computation = previous * current
      default:
                    return
}
this.currentOperand = computation
this.operation = undefined
this.previousOperand = ''
}

getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
     if (isNaN(integerDigits)) {
         integerDisplay = ''
     } else {
         integerDisplay = integerDigits.toLocaleString('en', {
             maximumFractionDigits: 0
         })
     }
     if (decimalDigits != null) {
         return `${integerDisplay}.${decimalDigits}`
     } else {
         return integerDisplay
     }
}

updateDisplay() {
this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
if (this.operation != null) { 
    this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`
} else {
    this.previousOperandTextElement.innerText = ''
}

}
}


const numberButtons = document.querySelectorAll("[data-number]")
const operationButtons = document.querySelectorAll("[data-operation]")
const equalsButton = document.querySelector("[data-equals]")
const deleteButton = document.querySelector("[data-delete]")
const allClearButton = document.querySelector("[data-all-clear]")
const previousOperandTextElement = document.querySelector("[data-previous-operand]")
const currentOperandTextElement = document.querySelector("[data-current-operand]")

const calculators = new calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculators.appendNumber(button.innerText)
        calculators.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculators.chooseOperation(button.innerText)
        calculators.updateDisplay()
    })
})

allClearButton.addEventListener('click', Button => {
    calculators.clear()
    calculators.updateDisplay()
})


deleteButton.addEventListener('click', Button => {
    calculators.delete()
    calculators.updateDisplay()
})


equalsButton.addEventListener('click', Button => {
    calculators.compute()
    calculators.updateDisplay()
    calculators.clear()
})