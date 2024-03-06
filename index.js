const prompt = require('prompt-sync')();
const chalk = require('chalk');
const fs = require('fs');
let questionNumber = 1;
let key;
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
}
//gpt prompt for key generation - Convert the following into json with the keys as the question numbers (ie. "1" or "17) and the values as the corresponding answers in capital letters
while(questionNumber<=20) {
    let question = prompt(questionNumber + ": ");
    if (question == key[questionNumber]) {
        console.log(chalk.green("Correct :)"))
        questionNumber++
    } else if (question == "quit") {
        break;
    } else {
        console.log(chalk.red(`Incorrect, correct answer is ${chalk.bold(key[questionNumber])}`))
        questionNumber++
    }
}