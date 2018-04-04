const fs = require("fs");
const { A, B } = returnArrays(process.argv[2]).sets[0];

function print(matrix, fn) {
  return matrix.map(fn).join("\n \n");
}

function printMatrix(matrix) {
  return print(matrix, arr =>
    arr.map(el => `${String(el).padStart(8)} `).join("")
  );
}

function printVector(vector) {
  return print(vector, el => `${el}`.padStart(8));
}

function printVectorExp(vector) {
  return print(vector, el => `${toExp(el)}`.padStart(20));
}

function generateReportText(matrixAlfa, vectorBeta, e, mni, Xk1, prevXk1, i) {
  return `
RAPORT:
  
Macierz wejściowa:

${printMatrix(A)}

----------------------------------------------------------------------

Wektor wejściowy:

${printVector(B)}

----------------------------------------------------------------------

Dokładnośc e: ${e}

----------------------------------------------------------------------

Maksymalna liczba iteracji: ${mni}

----------------------------------------------------------------------

Macierz Alfa:

${printMatrix(matrixAlfa)}

----------------------------------------------------------------------

Wektor Beta:

${printVector(vectorBeta)}

----------------------------------------------------------------------

Wektor ostatnio wykonanej operacji:

${printVectorExp(Xk1)}

----------------------------------------------------------------------

Wektor przedostatnio wykonanej operacji:

${printVectorExp(prevXk1)}

----------------------------------------------------------------------

Liczba wykonanych operacji: ${i}
`;
}

function createReport(text) {
  fs.writeFile("raport.txt", text, function(err) {
    if (err) throw err;
    console.log("Saved!");
  });
}

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
  const jsonData = fs.readFileSync(filename);
  return JSON.parse(jsonData);
}

function addMatrix(A, B) {
  return A.map((a, i) => a + B[i]);
}

function mult(matrix, vector) {
  return matrix.map((row, rowIndex) =>
    row
      .map((_, cellIndex) => {
        const a = matrix[rowIndex][cellIndex];
        const b = vector[cellIndex];
        return a * b;
      })
      .reduce((accumulator, currentValue) => accumulator + currentValue)
  );
}

function toExp(el) {
  return Number.parseFloat(el).toExponential(10);
}

module.exports = {
  matrix: createMatrix(A),
  vector: createVector(A, B),
  mult,
  addMatrix,
  generateReportText,
  createReport
};
