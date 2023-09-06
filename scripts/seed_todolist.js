const { ethers } = require("hardhat");
const config = require("../src/config.json");

const wait = (seconds) => {
  const milliseconds = seconds * 1000;
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

async function main() {
  // Fetch accounts from wallet
  const accounts = await ethers.getSigners();

  // Fetch network
  const { chainId } = await ethers.provider.getNetwork();
  console.log(`Using chainID: ${chainId}`);

  const TodoList = await ethers.getContractAt(
    "TodoList",
    config[chainId].TODOLIST.address
  );

  console.log(`TodoList contract fetched: ${TodoList.address}\n`);

  // Create Tasks
  let tasks = [
    { category: "Cleaning", description: "LivingRoom" },
    { category: "Shopping", description: "Groceries" },
    { category: "Shopping", description: "Returning books" },
    { category: "Babysitting", description: "Siblings" },
    { category: "Cleaning", description: "Car" },
  ];
  let transaction, result;

  for (let j = 0; j < accounts.length; j++) {
    console.log(`${j} - For ${accounts[j].address}:`);
    for (let i = 0; i < tasks.length; i++) {
      transaction = await TodoList.connect(accounts[j]).addTask(
        tasks[i].category,
        tasks[i].description
      );

      await wait(1);

      result = await transaction.wait();
      if (result.events[0].event === "TaskCreated") {
        console.log(
          `Task ${i + 1} created: ${tasks[i].category}, ${
            tasks[i].description
          }.`
        );
      }
    }
    console.log("\n");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
