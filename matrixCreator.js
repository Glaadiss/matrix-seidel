function createMatrix(matrix) {
  return matrix.map((row, rowIndex) =>
    row.map((_, cellIndex) => {
      const Aij = matrix[rowIndex][cellIndex];
      const Aii = matrix[rowIndex][rowIndex];
      if (Aii === 0) throw new Error("can't divide by 0");
      return rowIndex === cellIndex ? 0 : -Aij / Aii;
    })
  );
}

function createVector(matrix, vector) {
  return matrix.map((_, index) => {
    const Aii = matrix[index][index];
    const Bi = vector[index];
    if (Aii === 0) throw new Error("can't divide by 0");
    return Bi / Aii;
  });
}

function returnArrays(filename) {
  var fs = require("fs");
  var jsonData = fs.readFileSync(filename);
  return JSON.parse(jsonData);
}

function mult(matrix, vector) {
  return matrix.map((row, rowIndex) =>
    row.map((_, cellIndex) => {
      const a = matrix[rowIndex][cellIndex];
      const b = vector[cellIndex];
      return a * b;
    }).reduce((accumulator, currentValue) => (accumulator + currentValue))
  );
}

const { A, B } = returnArrays("./data1.json");
module.exports = { matrix: createMatrix(A), vector: createVector(A, B), mult };