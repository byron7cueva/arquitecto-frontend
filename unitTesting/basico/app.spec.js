const {expect, it} = require('./framework');
const saludar = require('./app');

it('La función saluda', () => {
  expect(saludar('Platzi')).toBe('Hola Platzi');
});