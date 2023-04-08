#! /usr/bin/env node

import functions from "./functions.js";
import inquirer from "inquirer";
import chalk from "chalk"

let operator: string = "+";
let num2: number = 0;
let again: string = "yes";
const results = [];
let i = 0;
while (again.toLowerCase() !== "no") {
  let same: string = "yes";
  let operation = await inquirer.prompt([
    {
      name: "num1",
      message: "Enter first number:",
      type: "number",
    },
  ]);
  operation = operation.num1;
  let num1 = operation;
  let equation = [];
  equation.push(num1);
  while (same.toLowerCase() !== "no") {
    const answers = await inquirer.prompt([
      {
        name: "operator",
        message: `Enter any operator from {"+", "-", "*", "/", "%"}:`,
        type: "string",
        choices: ["+", "-", "*", "/"],
      },
      {
        name: "num2",
        message: "Enter second number:",
        type: "number",
      },
    ]);
    operator = answers.operator;
    num2 = answers.num2;
    equation.push(operator, num2)
    if (operator === "+") {
      operation = functions.sum(operation, num2);
    } else if (operator === "*") {
      operation = functions.mul(operation, num2);
    } else if (operator === "-") {
      operation -= num2;
    } else if (operator === "/") {
      operation /= num2;
    } else if (operator === "%") {
      operation %= num2;
    } else {
      console.log(chalk.bgRed("The desired operator is not available"));
      break;
    }
    console.log("So far the result is = ", operation);
    same = (
      await inquirer.prompt([
        {
          name: "same",
          message: chalk.bgRed("Do you want to continue with the existing operation: \n"),
          type: "string",
          choices: ["yes", "no"],
        },
      ])
    ).same;
}
console.log(chalk.bgBlueBright.white.bold("The final result of this operation is considered as = ", operation, "\n"));

again = (
    await inquirer.prompt([
        {
            name: "again",
            message: chalk.bgRed("Do you want to perform another operation: \n"),
            type: "string",
        },
    ])
    ).again;
    
    i = ++i;
    const message = `The final result of operation ${i} i.e. ${equation.join(" ")} is = ${operation} `;
    results.push(message);

}

console.log(chalk.bgWhite.black(results.join("\n")));
