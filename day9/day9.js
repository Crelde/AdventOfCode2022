const fs = require("fs");
const initPos = (size) => {
  var pos = [];
  for (let i = 0; i < size; i++) {
    pos[i] = { x: 0, y: 0 };
  }
  return pos;
};
const tailPositionVisits = (input, ropeLength) => {
  let visitedPositions = new Set();
  let positions = initPos(ropeLength);
  input.split("\n").map((e) => ({ dir: e.split(" ")[0], steps: +e.split(" ")[1] }))
    .forEach((e) =>
      move(visitedPositions, e.dir, e.steps, positions, ropeLength));
  return Array.from(visitedPositions.values()).reduce((a, c) => (c ? a + 1 : a),0);
};
const move = (visitedPositions, direction, length, positions, ropeLength) => {
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < ropeLength - 1; j++) {
      if (j === 0) {
        positions[j] = moveHead(direction, positions[j]);
        positions[j + 1] = catchUp(positions[j], positions[j + 1]);
      } else {
        positions[j + 1] = catchUp(positions[j], positions[j + 1]);
      }
      if (j == ropeLength - 2) {
        visitedPositions.add(JSON.stringify(positions[j + 1]));
      }
    }
  }
};
const moveHead = (direction, head) => {
  if (direction === "R") head.x += 1;
  if (direction === "L") head.x -= 1;
  if (direction === "U") head.y += 1;
  if (direction === "D") head.y -= 1;
  return head;
};

const catchUp = (head, tail) => {
  let xDiff = head.x - tail.x;
  let yDiff = head.y - tail.y;
  // check if tail is behind
  if (Math.abs(xDiff) > 1 || Math.abs(yDiff) > 1) {
    if (Math.abs(xDiff) > 1) {
      // head is two steps ahead horizontally
      if (xDiff < 0) tail.x = tail.x - 1;
      else {
        tail.x = tail.x + 1;
      }
    } else if (Math.abs(xDiff) === 1 && head.y != tail.y) {
      // not in the same col, move diagonally
      if (xDiff < 0) tail.x = tail.x - 1;
      else tail.x = tail.x + 1;
    }

    if (Math.abs(yDiff) > 1) {
      // head is two steps ahead vertically
      if (yDiff < 0) tail.y = tail.y - 1;
      else tail.y = tail.y + 1;
    } else if (Math.abs(yDiff) === 1 && head.x != tail.x) {
      // not in the same row, move diagonally
      if (yDiff < 0) tail.y = tail.y - 1;
      else tail.y = tail.y + 1;
    }
  }
  return tail;
};

fs.readFile("input.txt", "utf-8", (err, data) =>
  console.log("Day9, Part1: " + tailPositionVisits(data, 2), "Day9, Part2: "+ tailPositionVisits(data, 10))
);
