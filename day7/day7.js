const fs = require("fs");
const getSums = (input) => {
  let files = [], activeDir = [];
  input.split("\r\n").forEach((c) => {
    if (c.startsWith("$ cd")) {
      if (c.split(" ")[2] === "..") activeDir.pop();
      else activeDir.push(activeDir.join("|") + c.split(" ")[2]);
    } else if (c.match(/^\d/)) {
      activeDir.forEach((folderName) => {
        files[folderName] = files[folderName] === undefined ? [c] : [c, ...files[folderName]];
      });
    }
  });
  return Object.entries(files).map((e) => ({name: e[0],size: e[1].reduce((a, c) => +c.split(" ")[0] + a, 0)}));
};
const smallestDirectoryNeeded = (input, totalSize, neededSpace) => {
  let sums = getSums(input);
  return sums.reduce((a, c) =>c.size >= neededSpace - (totalSize - sums[0].size) && c.size <= a? c.size: a,30000000);
};
const smallDirectoriesSum = (input, maxSize) =>getSums(input).reduce((a, c) => (c.size <= maxSize ? a + c.size : a), 0);
fs.readFile("input.txt", "utf-8", (err, data) =>console.log("Day7, Part1: " + smallDirectoriesSum(data, 100000),"Day7, Part2: " + smallestDirectoryNeeded(data, 70000000, 30000000)));
