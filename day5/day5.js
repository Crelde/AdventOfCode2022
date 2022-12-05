const fs = require("fs");
const crateRearrangement = (input, moveFunc) => {
  let stacks = Array.from(Array(input.substring(0, input.indexOf(" 1 ")).split("\n").length)).map((e, i) =>
    input.split("\r\n").filter((e) => e.includes("[")).map((f) => f.substring(3 * i + i + 1, 3 * (i + 1) + i - 1)).filter((e) => e !== " ")).map(e=>e.reverse());

  input.split("\r\n").filter((e) => e.indexOf("m") == 0).map((e) => e.match(/move (\d+) from (\d+) to (\d+)/))
    .map(([_, count, from, to]) => ({ count, from, to })).map((e) => moveFunc(stacks, +e.count, +e.from - 1, +e.to - 1));
    return stacks.map((e) => e.reverse()).map((e) => e[0]).join("");
};
const move1 = (crates, cratesToMove, from, to) => crates[to].push(...crates[from].splice(-cratesToMove, cratesToMove).reverse())
const move2 = (crates, cratesToMove, from, to) => crates[to].push(...crates[from].splice(-cratesToMove, cratesToMove))
fs.readFile("input.txt", "utf-8", (err, data) => console.log("Day5, Part1: " + crateRearrangement(data,move1), "Day5, Part2: " + crateRearrangement(data,move2)));