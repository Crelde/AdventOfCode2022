const fs = require("fs");
const signalStrengthSum = (input, endAtCycle, func) => {
  let cycleMap = [1];
  let operations = input.split("\n").map((e) => e.split(" "));
  let currentCycle = 0;
  operations.forEach(([a, b]) => {
    if (a === "addx") {
      currentCycle += 2;
      if (cycleMap[currentCycle] === undefined) cycleMap[currentCycle] = +b;
      else cycleMap[currentCycle] = cycleMap[currentCycle].push(+b);
    } else if ((a = "noop")) {
      currentCycle += 1;
      cycleMap[currentCycle] = undefined;
    }
  });
  return func(cycleMap, endAtCycle);
};
const drawLines = (cycleArr, endAtCycle) => {
  let currentRound = 0;
  let lines = "";
  while (currentRound * endAtCycle + endAtCycle <= cycleArr.length) {
    lines += drawLine(cycleArr, endAtCycle, currentRound);
    currentRound++;
  }
  return lines;
};
const drawLine = (cycleArr, endAtCycle, round) => {
  let line = "\n";
  for (let i = 1; i < endAtCycle; i++) {
    line += drawPixel(
      cycleArr
        .slice(0, i + round * endAtCycle)
        .reduce((a, c) => (c !== undefined ? a + c : a), 0),
      i
    );
  }
  return line;
};
const drawPixel = (x, i) => {
  //if sprite in range
  if (Math.abs(i - 1 - x) < 2) {
    return "#";
  } else {
    return ".";
  }
};
const countSum = (cycleArr, endAtCycle) => {
  let values = [];
  let currentCycle = 0;
  while (currentCycle * 40 + 20 <= endAtCycle) {
    values.push(
      cycleArr
        .slice(0, currentCycle * 40 + 20)
        .reduce((a, c) => (c !== undefined ? a + c : a), 0) *
        (currentCycle * 40 + 20)
    );
    currentCycle++;
  }
  return values.reduce((a, c) => a + c, 0);
};

fs.readFile("input.txt", "utf-8", (err, data) =>
  console.log(
    "Day10, Part1: " + signalStrengthSum(data, 220, countSum),
    "Day10, Part2: " + signalStrengthSum(data, 40, drawLines)
  )
);
