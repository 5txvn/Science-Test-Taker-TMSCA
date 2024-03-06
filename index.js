//import all the required libs
const prompt = require('prompt-sync')();
const chalk = require('chalk');
const fs = require('fs');
let questionNumber = 1;
let score = 0;
let key;
console.log(fs.existsSync(`./keys/23-24/5.json`))
let hasCode = prompt("Do you have a test code (y/n): ");
if (hasCode == "y") {
    const code = prompt("Please enter the code: ")
    const temp = code.split(":")
    if (temp.length < 2 || !fs.existsSync(`./keys/${temp[0]}/${temp[1]}.json`)) {
        console.log("Invalid code, exiting program...");
        process.exit();
    } else {
        key = JSON.parse(fs.readFileSync(`./keys/${temp[0]}/${temp[1]}.json`, "utf8"))
    }
} else if (hasCode == "n") {
    const code = prompt("Please enter the JSON for the key: ")
    key = JSON.parse(code)
} else if (hasCode == "quit") {
  process.exit()
} else {
  console.log("Invalid option, exiting program...");
  process.exit();
}
//gpt prompt for key generation - Convert the following into json with the keys as the question numbers (ie. "1" or "17) and the values as the corresponding answers in capital letters
while(questionNumber<=20) {
    let currentTime = Date.now();
    let question = prompt(questionNumber + ": ");
    if (question == key[questionNumber]) {
      score += 6;
        console.log(chalk.green(`Correct! Response time was ${(Date.now() - currentTime) / 1000} seconds. Current score is ${score}`))
        questionNumber++;
    } else if (question == "quit") {
        break;
    } else if (question == "" || question == "skip") {
      console.log(chalk.yellow(`Skipped! Response time was ${(Date.now() - currentTime) / 1000} seconds, and the correct answer was ${key[questionNumber]}. Current score is ${score}`))
    } else {
      score -= 2;
        console.log(chalk.red(`Incorrect, correct answer is ${chalk.bold(key[questionNumber])}, and response time was ${(Date.now() - currentTime) / 1000} seconds. Current score is ${score}`))
        questionNumber++;
    }
}