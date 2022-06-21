

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

        /* converts operand to string in order to slice. Go from index 0 to second to last and store in currentOperand variable  */
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        /* add number to screen when number clicked */

        /* only allow one period to be inputed per */
        if(number === '.' && this.currentOperand.includes('.')) return;

        /* conver to string because want to concatenate, not add */
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        /* execute calculation based on chosen operation */

        /* if current operand is empty, exit code */
        if(this.currentOperand === '') return;

        /* if previos operand div already has number stored in it, do computation between current and previous operands then update previous operands with new value */
        if(this.previousOperand !== ''){
            this.compute();
        }

        this.operation = operation;

        /* puts current operand into previous operand div */
        this.previousOperand = this.currentOperand;

        /* clears current operand div */
        this.currentOperand = '';
    }

    compute() {
        /* take all value inputted into calculator and display single value based on computation */
        let computation;

        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand)

        if(isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case 'x':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            default: 
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    getDisplayNumber(number){
        /* sets number string variable to split string on decimal place */
        const stringNumber = number.toString();

        /* turns string number into an array. First number is part before decimal. Second number is after decimal. Stores first number - integer - of array. */
        const integerDigits = parseFloat(stringNumber.split('.')[0]);

        /* stores numbers after decimal in array */
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        
        /* if user inputs nothing or just decimal */
        if(isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            /* only allows 1 decimal */
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0});
        }
        
        /* if there is a decimal and there are decimal digits */
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        /* update values inside of output */
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        
        /* displays operation symbol at end of previous operand */
        if(this.operation != null){
            this.previousOperandTextElement.innerText = 
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            /* delete previous operand after calculation is completed */
            this.previousOperandTextElement.innerText = '';
        }
    }
};


const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector("[data-previous-operand]");
const currentOperandTextElement = document.querySelector("[data-current-operand]");
const themeToggle = document.querySelector("#checkbox");
const destroyMath = document.querySelector("#destroy-math-btn");
const title = document.querySelector("#title");

/* new instance of calculator */
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

/* when a button is clicked, concatenate the number and update display */
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay();
    });
});

/* performs computation based on chosen operation */
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay();
    });
});

/* computes total when = clicked */
equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});

/* clears display when AC clicked */
allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});

/* deletes last digit when DEL clicked */
deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});


/* Theme Toggle Button */


//on theme button click, change background to dark theme mode and change color of button 


themeToggle.addEventListener('change', () => {
    document.body.classList.toggle("dark");
    
});

destroyMath.addEventListener('click', () => {
    document.body.classList.toggle("hidden");
});

