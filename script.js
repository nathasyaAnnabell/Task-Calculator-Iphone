document.addEventListener('DOMContentLoaded', () => {
    const resultElement = document.querySelector('.result span');
    const buttons = Array.from(document.querySelectorAll('.buttons .item'));

    let currentInput = '';
    let operator = '';
    let firstValue = null;

    function updateDisplay(value) {
        resultElement.textContent = value;
    }

    function handleNumberClick(value) {
        if (currentInput === '0' && value !== '.') {
            currentInput = value;
        } else if (currentInput.length < 12) {
            currentInput += value;
        }
        updateDisplay(currentInput);
    }

    function handleOperatorClick(value) {
        if (currentInput === '') return;

        if (firstValue === null) {
            firstValue = parseFloat(currentInput);
        } else if (operator) {
            firstValue = performCalculation(firstValue, parseFloat(currentInput), operator);
        }

        operator = value;
        currentInput = '';
    }

    function handleEqualsClick() {
        if (operator && currentInput !== '') {
            currentInput = performCalculation(firstValue, parseFloat(currentInput), operator).toString();
            updateDisplay(currentInput);
            operator = '';
            firstValue = null;
        }
    }

    function performCalculation(a, b, op) {
        switch (op) {
            case '+': return a + b;
            case '-': return a - b;
            case 'x': return a * b;
            case '/': return a / b;
            default: return b;
        }
    }

    function handleClearClick() {
        currentInput = '';
        operator = '';
        firstValue = null;
        updateDisplay('0');
    }

    function handleNegativeClick() {
        if (currentInput) {
            currentInput = (parseFloat(currentInput) * -1).toString();
            updateDisplay(currentInput);
        }
    }

    function handlePercentClick() {
        if (currentInput) {
            currentInput = (parseFloat(currentInput) / 100).toString();
            updateDisplay(currentInput);
        }
    }

    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            const value = event.target.value || event.target.textContent;

            if (button.classList.contains('numbers') || button.classList.contains('dot')) {
                handleNumberClick(value);
            } else if (button.classList.contains('sign')) {
                if (value === '=') {
                    handleEqualsClick();
                } else {
                    handleOperatorClick(value);
                }
            } else if (button.classList.contains('clear')) {
                handleClearClick();
            } else if (button.classList.contains('negative')) {
                handleNegativeClick();
            } else if (button.classList.contains('persent')) {
                handlePercentClick();
            }
        });
    });
});
