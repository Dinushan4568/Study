document.addEventListener('DOMContentLoaded', function () {
    const screen = document.getElementById('calculator-screen');
    const keys = document.querySelector('.calculator-keys');
    let currentInput = '';
    let operator = '';
    let previousInput = '';

    keys.addEventListener('click', function (event) {
        const target = event.target;
        const value = target.value;

        if (!target.matches('button')) {
            return;
        }

        switch (value) {
            case '+':
            case '-':
            case '*':
            case '/':
                operator = value;
                previousInput = currentInput;
                currentInput = '';
                break;
            case '=':
                currentInput = calculate(previousInput, currentInput, operator);
                operator = '';
                previousInput = '';
                break;
            case 'all-clear':
                currentInput = '';
                operator = '';
                previousInput = '';
                break;
            default:
                currentInput += value;
        }

        screen.value = currentInput;
    });

    function calculate(first, second, operator) {
        let result = '';

        switch (operator) {
            case '+':
                result = parseFloat(first) + parseFloat(second);
                break;
            case '-':
                result = parseFloat(first) - parseFloat(second);
                break;
            case '*':
                result = parseFloat(first) * parseFloat(second);
                break;
            case '/':
                result = parseFloat(first) / parseFloat(second);
                break;
            default:
                return second;
        }

        return result.toString();
    }
});