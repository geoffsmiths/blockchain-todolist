# Blockchain-todolist

### About

This project is still on going. Basically it is a very simple
blockchain todo list. The main purpose is to store tasks on an EVM compatible 
blockchain. It stores a category, a description and if it is done or not.

Nobody else is able to manage the todolist except for my wife...

### Technology stack & tools

- Solidity
- Javascript
- Ethers.js
- Hardhat
- Git

### Requirements

You should have installed NodeJS and Hardhat

## Setting up

### Install dependencies
`npm install`

### Then compile the solidity contracts (can be found in ./contracts)

`npx hardhat compile`

### Now we run some unit tests (can be found in ./test)
`npx hardhat test`