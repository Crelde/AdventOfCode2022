const fs = require("fs");   
const assignmentPairs = (i, func) => i.split("\r\n").map((e) => e.split(",")).reduce((a,c) =>func(+c[0].split("-")[0],+c[0].split("-")[1],+c[1].split("-")[0],+c[1].split("-")[1]) ? a+1:a+0,0)   
const checkContains = (a,b,c,d) => (a >= c && b <= d) || (c >= a && d <= b);
const checkOverlaps = (a,b,c,d) => (d > b && c < b) ||(b >d && a < d) || a===c||b===d||a===d||b===c
fs.readFile("input.txt", "utf-8", (err, data) =>console.log("Day4, Part1: " + assignmentPairs(data,checkContains),"\nDay4, Part2: " + assignmentPairs(data,checkOverlaps)));