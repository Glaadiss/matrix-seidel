function createMatrix(matrix, vector) {
  return matrix.map((row, rowIndex) =>
    row.map((cell, cellIndex) => {
      const Aij = matrix[rowIndex][cellIndex];
      const Aii = matrix[rowIndex][rowIndex];
      if (Aii === 0) throw new Error("can't divide by 0");
      return rowIndex === cellIndex ? 0 : -Aij / Aii;
    })
  );
}

function returnArrays(filename) {
  var fs = require("fs");
  var jsonData = fs.readFileSync(filename);
  return { A, B } = JSON.parse(jsonData);
}