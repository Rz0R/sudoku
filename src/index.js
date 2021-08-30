function solveSudoku(matrix) {

  const size = matrix.length;
  const boxSize = Math.sqrt(size);

  function findEmptyCell(matrix) {
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (matrix[row][col] === 0) {
          return [row, col];
        }
      }
    }
    return false;
  }

  function check(num, pos, matrix) {

    const [row, col] = pos;

    for (let i = 0; i < size; i++) {
      if (matrix[i][col] === num && i !== row) {
        return false;
      }
    }

    for (let i = 0; i < size; i++) {
      if (matrix[row][i] === num && i !== col) {
        return false;
      }
    }

    const boxRow = Math.floor(row / boxSize) * boxSize;
    const boxCol = Math.floor(col / boxSize) * boxSize;

    for (let i = boxRow; i < boxRow + boxSize; i++) {
      for (let j = boxCol; j < boxCol + boxSize; j++) {
        if (matrix[i][j] === num && i !== row && j !== col) {
          return false;
        }
      }
    }

    return true;
  }

  function solve() {
    const emptyCell = findEmptyCell(matrix);
    if (!emptyCell) {
      return true;
    }

    for (let num = 1; num <= size; num++) {
      if (check(num, emptyCell, matrix)) {
        const [x, y] = emptyCell;
        matrix[x][y] = num;

        if (solve()) {
          return true;
        }

        matrix[x][y] = 0;
      }

    }
    return false;
  }

  solve();
  return matrix;
}


module.exports = solveSudoku;