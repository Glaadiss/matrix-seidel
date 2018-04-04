const {
  matrix,
  vector,
  mult,
  addMatrix,
  substractVectors
} = require("./matrixCreator");

let i = 0;
let Xk1 = vector;
let XkSum = 0;
const MLI = 30;
const e = 0.0001;
const n = 5;
let dzielnik = 1;

while (dzielnik > e && i < MLI) {
  i++;
  const previousXk = Xk1;
  Xk1 = mult(matrix, previousXk);

  XkSum = Xk1.reduce((acc, curr, i) => acc + Math.abs(curr - previousXk[i]), 0);
  dzielnik = XkSum / n;
}
