import readline from "node:readline/promises";
import { runAgent } from "./agent";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

while (true) {
  const input = await rl.question(">>> ");

  if (input === "exit") {
    process.exit(0);
  }

  const res = await runAgent(input);

  console.log("\n", res, "\n");
}
