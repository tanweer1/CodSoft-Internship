const resultInput = document.getElementById('result');
const buttons = document.querySelectorAll('button');
const dobButton = document.querySelector('.dob');
const dobContainer = document.querySelector('.dob-container');
const dobInput = document.getElementById('dob-input');
const dobSubmit = document.querySelector('.dob-submit');

let currentOperator = null;
let firstNumber = null;
let shouldClearDisplay = false;
let dob = null;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.value;

    if (!isNaN(parseInt(value)) || value === '.') {
      if (shouldClearDisplay) {
        resultInput.value = '';
        shouldClearDisplay = false;
      }
      resultInput.value += value;
    } else if (value === '=') {
      calculate();
    } else if (value === 'C') {
      clear();
    } else if (value === 'DOB') {
      toggleDOBInput();
    } else {
      handleOperator(value);
    }
  });
});

dobButton.addEventListener('click', toggleDOBInput);
dobSubmit.addEventListener('click', submitDOB);

function toggleDOBInput() {
  dobContainer.style.display = dobContainer.style.display === 'none' ? 'block' : 'none';
}

function submitDOB() {
  dob = new Date(dobInput.value);
  toggleDOBInput();
  resultInput.value = `DOB: ${dob.toLocaleDateString()}`;
}

function handleOperator(operator) {
  if (currentOperator !== null) {
    calculate();
  }
  firstNumber = parseFloat(resultInput.value);
  currentOperator = operator;
  shouldClearDisplay = true;
}

function calculate() {
  if (currentOperator === null || firstNumber === null) return;
  const secondNumber = parseFloat(resultInput.value);
  let result;
  switch (currentOperator) {
    case '+':
      result = firstNumber + secondNumber;
      break;
    case '-':
      result = firstNumber - secondNumber;
      break;
    case '*':
      result = firstNumber * secondNumber;
      break;
    case '/':
      result = firstNumber / secondNumber;
      break;
  }
  resultInput.value = result.toString();
  firstNumber = null;
  currentOperator = null;
  shouldClearDisplay = true;
}

function clear() {
  resultInput.value = '';
  firstNumber = null;
  currentOperator = null;
  shouldClearDisplay = false;
  dob = null;
}