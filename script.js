document.addEventListener('DOMContentLoaded', () => {
    const resultInput = document.getElementById('result');
    const buttons = document.querySelectorAll('.btn');

    let currentInput = '0';
    let operator = null;
    let previousInput = '';
    let resetScreen = false;

    function updateDisplay() {
        resultInput.value = currentInput;
    }

    function appendNumber(number) {
        if (resetScreen) {
            currentInput = number;
            resetScreen = false;
        } else if (currentInput === '0' && number !== '.') {
            currentInput = number;
        } else if (number === '.' && currentInput.includes('.')) {
            return; // Prevent multiple decimal points
        } else {
            currentInput += number;
        }
        updateDisplay();
    }

    function chooseOperator(nextOperator) {
        if (operator && !resetScreen) {
            calculate();
        }
        previousInput = currentInput;
        operator = nextOperator;
        resetScreen = true;
    }

    function calculate() {
        let calculation;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        if (isNaN(prev) || isNaN(current)) return;

        switch (operator) {
            case '+':
                calculation = prev + current;
                break;
            case '-':
                calculation = prev - current;
                break;
            case '*':
                calculation = prev * current;
                break;
            case '/':
                if (current === 0) {
                    currentInput = "Error";
                    updateDisplay();
                    return;
                }
                calculation = prev / current;
                break;
            case '%':
                calculation = prev % current;
                break;
            default:
                return;
        }
        currentInput = calculation.toString();
        operator = null;
        resetScreen = true;
        updateDisplay();
    }

    function clearCalculator() {
        currentInput = '0';
        operator = null;
        previousInput = '';
        resetScreen = false;
        updateDisplay();
    }

    function deleteLastChar() {
        if (currentInput.length === 1 || currentInput === 'Error') {
            currentInput = '0';
        } else {
            currentInput = currentInput.slice(0, -1);
        }
        updateDisplay();
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonText = button.textContent;

            if (button.classList.contains('number') || buttonText === '.') {
                appendNumber(buttonText);
            } else if (button.classList.contains('operator')) {
                if (buttonText === 'DEL') {
                    deleteLastChar();
                } else {
                    chooseOperator(buttonText);
                }
            } else if (button.classList.contains('equal')) {
                calculate();
            } else if (button.classList.contains('clear')) {
                clearCalculator();
            }
        });
    });

    updateDisplay(); // Initialize display with '0'
});
