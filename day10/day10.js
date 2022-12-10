const fs = require("fs");
const input = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`;
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
  console.log(func(cycleMap, endAtCycle));
};
const drawLines = (cycleArr, endAtCycle) => {
  let currentRound = 0;
  while (currentRound * endAtCycle + endAtCycle <= cycleArr.length) {
    drawLine(cycleArr, endAtCycle, currentRound);
    currentRound++;
  }
};
const drawLine = (cycleArr, endAtCycle, round) => {
  let line = "";
  for (let i = 1; i < endAtCycle; i++) {
    line += drawPixel(
      cycleArr
        .slice(0, i + round * endAtCycle)
        .reduce((a, c) => (c !== undefined ? a + c : a), 0),
      i
    );
  }
  console.log(line);
};
const drawPixel = (x, i) => {
  //if sprite in range
  //   console.log(
  //     "X: " + x,
  //     "Cycle: " + i,
  //     "Pos: " + (i - 1),
  //     "Diff: " + Math.abs(i - x)
  //   );
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
