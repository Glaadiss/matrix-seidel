var fs = require("fs");

// FUNKCJE POMOCNICZE
function returnArrays(filename) {
  var jsonData = fs.readFileSync(filename);
  return JSON.parse(jsonData);
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

function addVector(A, B) {
  return A.map((a, i) => a + B[i]);
}

function mult(matrix, vector) {
  return matrix.map((row, rowIndex) =>
    row.map((_, cellIndex) => {
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

function print(matrix, fn) {
  return matrix.map(fn).join("\n");
}

function printMatrix(matrix) {
  return print(matrix, arr =>
    arr.map(el => `${String(el).padStart(8)} `).join("")
  );
}

function printVector(vector) {
  return print(vector, el => `${el} `);
}

function printVectorExp(vector) {
  return print(vector, el => `${toExp(el)}`);
}

function generateReportText(A, B, matrixAlfa, vectorBeta, e, mni, Xk1, prevXk1, i) {
  return `
RAPORT:
  
Macierz wejściowa:
${printMatrix(A)}

Wektor wejściowy:
${printVector(B)}

Dokładnośc e: ${e}

Maksymalna liczba iteracji: ${mni}

Macierz Alfa:
${printMatrix(matrixAlfa)}

Wektor Beta:
${printVector(vectorBeta)}

Wektor ostatnio wykonanej operacji:
${printVectorExp(Xk1)}

Wektor przedostatnio wykonanej operacji:
${printVectorExp(prevXk1)}

Liczba wykonanych operacji: ${i}
`;
}

function createReport(text) {
  fs.writeFile("raport.txt", text, function(err) {
    if (err) throw err;
    console.log("Saved!");
  });
}

// FUNKCJE GŁÓWNE

// a)
function wczytaj() {
  const { A, B } = returnArrays(process.argv[2]).sets[0]; // wczytanie macierzy A i wektora B z pliku podanego jako argument przy uruchamianiu programu

  // wczytaj argumenty z klawiatury podane przy starcie programu w kolejności:
  // n, E, MLI
  const n = Number(process.argv[3]);
  const E = Number(process.argv[4]);
  const MLI = Number(process.argv[5]);

  return { A, B, n, E, MLI };
}

// b)
function utworzMacierzAlphaIWektorBeta(A, B) {
  const a = createMatrix(A); // utworzenie macierzy alpha
  const b = createVector(A, B); // utworzenie wektora beta

  return { a, b };
}

// c)
function oblicz(a, b, n, E, MLI) {
  let i = 0;
  let Xk1 = b;
  let XkSum = 0;
  let dzielnik = 1;
  let previousXk;

  while (dzielnik > E && i < MLI) {
    i++;
    previousXk = Xk1;

    let tempXk1 = [];
    let tempSum = 0;

    // i = 0
    for (let j = 2; j < n; j++) {
      tempSum += a[0][j] * previousXk[j];
    }
    tempXk1[0] = tempSum + b[0];

    for (let i = 1; i < n; i++) {

      let tempSum1 = 0;
      for (let j = 0; j < i; j++) {
        tempSum1 += a[i][j] * tempXk1[j];
      }

      let tempSum2 = 0;
      for (let j = i + 1; j < n; j++) {
        tempSum2 += a[i][j] * previousXk[j];
      }

      tempXk1[i] = tempSum1 + tempSum2 + b[i];
    }

    Xk1 = tempXk1;

    XkSum = Xk1.reduce((acc, curr, i) => acc + Math.abs(curr - previousXk[i]), 0);
    dzielnik = XkSum / n;
  }

  return { a, b, Xk1, previousXk, i };
}

// d) 
function generujRaport(A, B, E, MLI, { a, b, Xk1, previousXk, i }) {
  const text = generateReportText(A, B, a, b, E, MLI, Xk1, previousXk, i);
  createReport(text);
  console.log(text);
}

// PROGRAM
const { A, B, n, E, MLI } = wczytaj();
const { a, b } = utworzMacierzAlphaIWektorBeta(A, B);
generujRaport(A, B, E, MLI, oblicz(a, b, n, E, MLI));