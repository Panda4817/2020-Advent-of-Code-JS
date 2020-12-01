const runner = require("./runner");

// Instructions:
// For each day, create a new JS file and a puzzle input file consisting
//  of the day number and then the extension .py or .txt.
// For example, on day 20 you would create "20.js" and "20.txt"
// Don't forget to put a 0 before days 1-9 (so day 5 becomes "05.js") but not on
// any other days. This ensures the days are sorted properly in the files view.

// Each day in the JS file, all you have to do is write and export a
//  part1(prompt) method and paste your puzzle input in the text file.
// You can also return a value and it will be printed out.
// The input will be read and passed to your code automatically.
// Add a part2() method when you're ready.
// Look at 01.py for an example

// Update the day in runner.run() each day to change which day is run.
// Your code will be automatically timed.

// For a menu where users can select a day, use this
// the argument for maxDay is optional, remove it for no limit
// runner.getDay(5).then((day) => runner.run(day))

runner.run(1);

("");
