const { matrix, vector, mult } = require("./matrixCreator");

console.log(matrix, vector);
console.log(mult(matrix, vector));

let i = 0;
let Xk1 = vector;
const MLI = 30;

while (i === 0 || i <= MLI) {
  i++;
}