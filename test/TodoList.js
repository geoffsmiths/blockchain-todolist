const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TodoList", () => {
  let accounts, deployer, user1, contract, tx, result, id;
  beforeEach(async () => {
    accounts = await ethers.getSigners();
    deployer = accounts[0];
    user1 = accounts[1];
    const Contract = await ethers.getContractFactory("TodoList");
    contract = await Contract.connect(deployer).deploy();
  });

  it("Create Task", async () => {
    tx = await contract.connect(accounts[2]).addTask("Cleaning", "Bathroom");
    result = await tx.wait();
    const args = result.events[0].args;
    expect(args.id.toString()).to.equal("1");
    expect(args.user).to.equal(accounts[2].address);
    expect(args.category).to.equal("Cleaning");
    expect(args.description).to.equal("Bathroom");
    expect(args.complete).to.equal(false);
  });

  it("Emits TaskCreated Event", async () => {
    tx = await contract.connect(accounts[3]).addTask("Cleaning", "Toilet");
    result = await tx.wait();
    expect(result.events[0].event).is.equal.toString("TaskCreated");
  });

  it("Completes task", async () => {
    tx = await contract.connect(accounts[3]).addTask("Cleaning", "Toilet");
    result = await tx.wait();
    const args = result.events[0].args;

    tx = await contract
      .connect(accounts[3])
      .completeTask(ethers.BigNumber.from(args.id));

    result = await tx.wait();

    expect(result.events[0].event).is.equal.toString("TaskCompleted");
    expect(result.events[0].args.complete).to.equal(true);
  });

  it("Create and Fetch tasks", async () => {
    for (let i = 0; i < 5; i++) {
      tx = await contract
        .connect(accounts[1])
        .addTask("Cleaning " + i, "Toilet " + i);
      result = await tx.wait();
    }

    tx = await contract.counter();

    result = await contract.tasks(accounts[1].address, 3);
    expect(result.id.toString()).to.equal("3");
    expect(result.category).to.equal("Cleaning 2");
    expect(result.description).to.equal("Toilet 2");
  });
});
