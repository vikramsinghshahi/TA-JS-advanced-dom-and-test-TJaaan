const getFullName = require('./fullname');

test('add "Vikram" + "Shahi" to equal "Vikram Shahi ', () => {
  expect(getFullName('Vikram', 'Shahi')).toBe('Vikram Shahi');
});
