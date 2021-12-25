

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
    case '*' :
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

                    return
}
this.currentOperand = computation
this.operation = undefined
this.previousOperand = ''
}

updateDisplay() {
this.currentOperandTextElement.innerText = this.currentOperand
this.previousOperandTextElement.innerText = this.previousOperand
}

}


const numberButtons = document.querySelectorAll("[data-number]")
const operationButtons = document.querySelectorAll("[data-operation]")
const equalButton = document.querySelector("[data-equal]")
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


equalButton.addEventListener('click', Button => {
    calculators.equal()
    calculators.updateDisplay()
})