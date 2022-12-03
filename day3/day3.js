const fs = require("fs");
const ruckSackSum = (input) =>
  input.split("\n").map((e) => e.split("")).map((e) => e.slice(0, e.length / 2)).flatMap((e, i) => [...new Set(e.flatMap((f) =>input.split("\n").map((e) => e.split(""))
  .map((e) => e.slice(e.length / 2))[i].filter((h) => h.includes(f))))]).map((c) =>c === c.toLowerCase() ? parseInt(c, 36) - 9 : parseInt(c, 36) - 9 + 26).reduce((a, c) => a + c, 0)
const ruckSackSumGroup = (input, grpSize) => Array.from(Array(input.split("\r\n").length / grpSize)).map((e, i) =>input.split("\r\n").map((e) => e.split("")).slice(i * grpSize, (i + 1) * grpSize))
    .flatMap((e) => [...new Set(e.reduce((a, c) => a.filter((f) => c.includes(f))))]).map((c) =>c === c.toLowerCase() ? parseInt(c, 36) - 9 : parseInt(c, 36) - 9 + 26).reduce((a, c) => a + c, 0)
fs.readFile("input.txt", "utf-8", (err, data) => console.log( "Day3, Part1: " + ruckSackSum(data),"\nDay3, Part2: " + ruckSackSumGroup(data, 3)));