const fs = require("fs");
const input = `Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 1`;
const monkeyBusinessLevel = (input, reliever, rounds) => {
  let monkeysRaw = input.split("\r\n\r\n");

  let monkeys = monkeysRaw
    .map((e) =>
      e.match(
        // If no \r :  /Monkey (\d):\nStarting items: (.+)\nOperation: new = (.+) (.) (.+)\nTest: divisible by (.+)\n  If true: throw to monkey (.+)\n  If false: throw to monkey (.+)/
        /Monkey (\d):\r\n  Starting items: (.+)\r\n  Operation: new = (.+) (.) (.+)\r\n  Test: divisible by (.+)\r\n    If true: throw to monkey (.+)\r\n    If false: throw to monkey (.+)/
      )
    )
    .map(
      ([
        _,
        monkeyId,
        startingItems,
        lhs,
        op,
        rhs,
        divisibleBy,
        throwToCond1,
        throwToCond2,
      ]) => ({
        monkeyId: +monkeyId,
        startingItems: startingItems.split(", ").map((e) => +e),
        lhs: +lhs,
        op,
        rhs: +rhs,
        divisibleBy: +divisibleBy,
        throwToCond1: +throwToCond1,
        throwToCond2: +throwToCond2,
        inspectionCount: 0,
      })
    );

  // Get common multiple
  let LCM = monkeys.reduce((a, c) => c.divisibleBy * a, 1);
  for (let i = 0; i < rounds; i++) {
    monkeys.map((m) => monkeyInspectItems(monkeys, m, reliever, LCM));
  }

  let monkeyBusinessLevel = monkeys
    .sort((a, b) => b.inspectionCount - a.inspectionCount)
    .slice(0, 2)
    .reduce((a, c) => a.inspectionCount * c.inspectionCount);

  return monkeyBusinessLevel;
};
const monkeyInspectItems = (monkeys, monkey, reliever, LCM) => {
  monkey.startingItems.forEach((i) => {
    let newWorryLevel = op(i, monkey);
    let relieved = reliever(newWorryLevel, LCM);
    relieved % monkey.divisibleBy === 0
      ? monkeys[monkey.throwToCond1].startingItems.push(relieved)
      : monkeys[monkey.throwToCond2].startingItems.push(relieved);
    monkey.inspectionCount++;
  });
  monkey.startingItems = [];
};
const op = (oldWorryLevel, monkey) => {
  if (monkey.op === "+") {
    return (
      (isNaN(monkey.lhs) ? oldWorryLevel : monkey.lhs) +
      (isNaN(monkey.rhs) ? oldWorryLevel : monkey.rhs)
    );
  } else if (monkey.op === "*") {
    return (
      (isNaN(monkey.lhs) ? oldWorryLevel : monkey.lhs) *
      (isNaN(monkey.rhs) ? oldWorryLevel : monkey.rhs)
    );
  }
};
const adjustWorryLevelPt2 = (currentWorryLevel, LCM) => {
  let adjusted =
    currentWorryLevel - (Math.floor(currentWorryLevel / LCM) - 1) * LCM;
  return adjusted;
};
const adjustWorryLevelPt1 = (currentWorryLevel) => {
  return Math.floor(currentWorryLevel / 3);
};

fs.readFile("input.txt", "utf-8", (err, data) =>
  console.log(
    "Day11, Part1: " + monkeyBusinessLevel(data, adjustWorryLevelPt1, 20),
    "Day11, Part2: " + monkeyBusinessLevel(data, adjustWorryLevelPt2, 10000)
  )
);
