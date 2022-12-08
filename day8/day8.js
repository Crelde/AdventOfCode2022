const fs = require("fs");
const getScenicScores = (input) => {
  let lines = input.split("\n").map((e) => e.split("").map((f) => +f));
  let scenicScore = new Map();
  Array.from(Array(lines.length)).map((e, i) => {
    lines.map((f, j) => {
      scenicScore.set(i + ":" + j, getScenicScore(lines, i, j));
    });
  });
  return Array.from(scenicScore.values()).reduce((a, c) => (c > a ? c : a), 0);
};
const countVisibleTrees = (input) => {
  let lines = input.split("\n").map((e) => e.split("").map((f) => +f));
  let gridSize = lines.length;
  let visibleTrees = new Map();
  Array.from(Array(gridSize)).map((e, i) => {
    // left
    let max = -1;
    lines.map((f, j) => {
      if (lines[i][j] <= max) {
        if (visibleTrees.get(i + ":" + j) !== true)
          visibleTrees.set(i + ":" + j, false);
      } else {
        max = lines[i][j];
        visibleTrees.set(i + ":" + j, true);
      }
    });
    // right
    max = -1;
    lines.map((f, j) => {
      if (lines[i][gridSize - 1 - j] <= max) {
        if (visibleTrees.get(i + ":" + (gridSize - 1 - j)) !== true)
          visibleTrees.set(i + ":" + (gridSize - 1 - j), false);
      } else {
        max = lines[i][gridSize - 1 - j];
        visibleTrees.set(i + ":" + (gridSize - 1 - j), true);
      }
    });
    // top
    max = -1;
    lines.map((f, j) => {
      if (lines[j][i] <= max) {
        if (visibleTrees.get(j + ":" + i) !== true)
          visibleTrees.set(j + ":" + i, false);
      } else {
        max = lines[j][i];
        visibleTrees.set(j + ":" + i, true);
      }
    });
    // bottom
    max = -1;
    lines.map((f, j) => {
      if (lines[gridSize - 1 - j][i] <= max) {
        if (visibleTrees.get(gridSize - 1 - j + ":" + i) !== true)
          visibleTrees.set(gridSize - 1 - j + ":" + i, false);
      } else {
        max = lines[gridSize - 1 - j][i];
        visibleTrees.set(gridSize - 1 - j + ":" + i, true);
      }
    });
  });
  return Array.from(visibleTrees.values()).reduce((a, c) => (c ? a + 1 : a), 0);
};
function leftScore(size, grid, x, y, sum) {
  if (x === 0) return sum;
  if (grid[x - 1][y] >= size) return sum + 1;
  return leftScore(size, grid, x - 1, y, sum + 1);
}
function rightScore(size, grid, x, y, sum) {
  if (x === grid.length - 1) return sum;
  if (grid[x + 1][y] >= size) return sum + 1;
  return rightScore(size, grid, x + 1, y, sum + 1);
}
function upScore(size, grid, x, y, sum) {
  if (y === 0) return sum;
  if (grid[x][y - 1] >= size) return sum + 1;
  return upScore(size, grid, x, y - 1, sum + 1);
}
function downScore(size, grid, x, y, sum) {
  if (y === grid.length - 1) return sum;
  if (grid[x][y + 1] >= size) return sum + 1;
  return downScore(size, grid, x, y + 1, sum + 1);
}
const getScenicScore = (grid, x, y) => {
  let l = leftScore(grid[x][y], grid, x, y, 0);
  let r = rightScore(grid[x][y], grid, x, y, 0);
  let u = upScore(grid[x][y], grid, x, y, 0);
  let d = downScore(grid[x][y], grid, x, y, 0);
  return l * r * u * d;
};
fs.readFile("input.txt", "utf-8", (err, data) =>
  console.log(
    "Day8, Part1: " + countVisibleTrees(data),
    "Day8, Part2: " + getScenicScores(data)
  )
);
