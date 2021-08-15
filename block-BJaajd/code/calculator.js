function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function sum(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

function power(a) {
  return a ** a;
}

function factorial(a) {
  let num = 1;
  for (let i = 1; i <= a; i++) {
    num = num * i;
  }
  return num;
}

module.exports = {
  add,
  subtract,
  sum,
  multiply,
  power,
  factorial,
};
