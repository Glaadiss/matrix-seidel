const { matrix, vector, mult, addMatrix } = require("./matrixCreator");

console.log(matrix, vector);
console.log(mult(matrix, vector));

let i = 0;
let Xk1 = vector;
let XkSum = 0;
const MLI = 30;
const e = 0.0001;
const n = 5;

while (i === 0 || (i <= MLI && XkSum / n <= e)) {
  i++;
  const previousXk = Xk1;
  Xk1 = addMatrix(mult(matrix, previousXk), vector);
  XkSum += Math.abs(Xk1 - previousXk);
}

console.log(Xk1);
