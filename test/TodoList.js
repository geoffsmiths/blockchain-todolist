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

  it("Your wife is the Deployer", async () => {
    const wife = await contract.wife();
    expect(deployer.address).is.equal.toString(wife);
  });

  it("Only your wife can add tasks", async () => {
    await expect(
      contract.connect(user1).addTask(user1.address, "Cleaning", "LivingRoom")
    ).to.be.revertedWith("Only your wife can add tasks");
  });

  it("Create Task", async () => {
    tx = await contract.addTask(user1.address, "Cleaning", "Bathroom");
    result = await tx.wait();
    const args = result.events[0].args;
    id = args[0].toString();
    expect(id).to.equal("1");
    expect(args.category).to.equal("Cleaning");
    expect(args.description).to.equal("Bathroom");
    expect(args.complete).to.equal(false);
  });

  it("Emits TaskCreated Event", async () => {
    tx = await contract.addTask(user1.address, "Cleaning", "Toilet");
    result = await tx.wait();
    expect(result.events[0].event).is.equal.toString("TaskCreated");
  });

  it("Completes task", async () => {
    tx = await contract.completeTask(user1.address, ethers.BigNumber.from(id));
    result = await tx.wait();
    expect(result.events[0].event).is.equal.toString("TaskCompleted");
    const args = result.events[0].args;
    expect(args.complete).to.equal(true);
  });
});
