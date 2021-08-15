const calculator = require('./calculator');

test('add 1 + 2 to equal to 3 ', () => {
  expect(calculator.add(1, 2)).toBe(3);
});

test('sub 2 - 1 to equal to 1 ', () => {
  expect(calculator.subtract(2, 1)).toBe(1);
});

test('sum 2 + 1 to equal to 3 ', () => {
  expect(calculator.sum(2, 1)).toBe(3);
});

test('power 2 to equal to 4 ', () => {
  expect(calculator.power(2)).toBe(4);
});

test('factorial 5 to equal to 120 ', () => {
  expect(calculator.factorial(5)).toBe(120);
});
