const {
  matrix,
  vector,
  mult,
  addMatrix,
  generateReportText,
  createReport
} = require("./matrixCreator");

let i = 0;
let Xk1 = (previousXk = vector);
let XkSum = 0;
const e = Number(process.argv[3]);
const MLI = Number(process.argv[4]);
const n = matrix.length;
let dzielnik = 1;

while (dzielnik > e && i < MLI) {
  i++;
  previousXk = Xk1;
  Xk1 = mult(matrix, previousXk);
  XkSum = Xk1.reduce((acc, curr, i) => acc + Math.abs(curr - previousXk[i]), 0);
  dzielnik = XkSum / n;
}

const text = generateReportText(matrix, vector, e, MLI, Xk1, previousXk, i);
console.log(text);
createReport(text);
