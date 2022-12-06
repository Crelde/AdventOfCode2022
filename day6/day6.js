const fs = require("fs");
const charsProcessed = (i, s) => i.split("").reduce((a,c,i) =>new Set(a.slice(i-(s-1),(s-1)+i)).add(c).size === s ? [...a, "rip"] : [...a,c],[]).indexOf("rip")+1
fs.readFile("input.txt", "utf-8", (err, data) => console.log("Day6, Part1: " + charsProcessed(data,4), "Day6, Part2: "+ charsProcessed(data,14)));