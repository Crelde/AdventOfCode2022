const fs = require("fs");
const totalScore = (input, func) => input.split("\r\n").map((e) => e.split(" ")).map((e) => func(e)).reduce((a, c) => a + c, 0)
const getScorePt1 = (arr) => arr[0] === "A" ? arr[1] === "X" ? 4 : arr[1] === "Y" ? 8 : 3 : arr[0] === "B" ? arr[1] === "X" ? 1 : arr[1] === "Y" ? 5 : 9 : arr[0] === "C" ? arr[1] === "X" ? 7 : arr[1] === "Y" ? 2 : 6 : 0
const getScorePt2 = (arr) => arr[0] === "A" ? arr[1] === "X" ? 3 : arr[1] === "Y" ? 4 : 8 : arr[0] === "B" ? arr[1] === "X"? 1: arr[1] === "Y"? 5: 9: arr[0] === "C"? arr[1] === "X" ? 2 : arr[1] === "Y"? 6 : 7 : 0
fs.readFile("input.txt", "utf-8", (err, data) => console.log("Day2, Part1: "+ totalScore(data, getScorePt1), "\nDay2, Part2: "+totalScore(data, getScorePt2)));