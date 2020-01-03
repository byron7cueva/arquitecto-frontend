const saludar = require("../app");

it("La función saluda", () => {
  expect(saludar("Platzi")).toBe("Hola Platzi");
  //toBe Validacion exacta
});

it("Contiene", () => {
  expect(saludar("Platzi")).toContain("Hola");
});

//Agrupaciones de test
var x = true;
var a = {};
var b = {};
describe("Verificar que la variable es true", () => {
  it("X es true", () => {
    expect(x).toBeTruthy();
    //expect(x).toBeFalsy();
  });

  it("Son iguales", () => {
    //Igualdad, solo funciona para tipos de datos primitivos
    //boolean, string, number --> no importa utilizar toBe o toEqual
    //Para variables de tipo complejo se comparar si se parecen con toEqual, que es comparación
    //en profundidad. Ya que toBe() compara el espacio de memoria y no la similitud
    //entre objetos.
    expect(a).toEqual(b);
  });
});

//Pruebas reto
const num1 = 5;
describe("Pruebas reto", () => {
  it("Is defined", () => {
    expect(num1).toBeDefined();
  });

  it("Un valor es mayor que otro", () => {
    expect(num1).toBeGreaterThan(2);
  });
});
