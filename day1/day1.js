const fs = require("fs");
const CalorieCount = (input, elves) => input.split("\r\n\r\n").map((e) => e.split("\r\n")).map((e) => e.reduce((a, c) => a + Number(c), 0)).sort((a, b) => b - a).slice(0, elves).reduce((a, c) => a + c, 0);
fs.readFile("input.txt", "utf-8", (err, data) => console.log("Day1, Part1: "+ CalorieCount(data, 1), "\nDay1, Part2: "+CalorieCount(data, 3)));