

class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
       /* clear all inputs and set to default values as soon as new calculator is created*/
        this.clear();
    }


    clear() {
        /* clear variables */
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        /* remove a single number */

    }

    appendNumber(number) {
        /* add number to screen when number clicked */

        /* only allow one period to be inputed per string */
        if(number === '.' && this.currentOperand.includes('.')) return;

        /* conver to string because want to concatenate, not add */
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        /* execute calculation based on chosen operation */
    }

    compute() {
        /* take all value inputted into calculator and display single value based on computation */
    }

    updateDisplay() {
        /* update values inside of output */
        this.currentOperandTextElement.innerText = this.currentOperand;
    }
};


const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector("[data-previous-operand]");
const currentOperandTextElement = document.querySelector("[data-current-operand]");

/* new instance of calculator */
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

/* when a button is clicked, concatenate the number and update display */
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay();
    })
})




