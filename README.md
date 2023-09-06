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
- ReactJs

### Requirements

You should have installed NodeJS and Hardhat

## Setting up

### Install dependencies
`npm install`

### Then compile the solidity contracts (can be found in ./contracts)

`npx hardhat compile`

### Now we run some unit tests (can be found in ./test)
`npx hardhat test`

## Deployment & Seeding

First we need to get de blockchain node running:

`npx hardhat node`

### Deployment

`npx hardhat run --network localhost ./scripts/deploy.js`

### Seeding

`npx hardhat run --network localhost ./scripts/seed_todolist.js`

## Running the app

### Requirements

- Metamask installed
- hardhat node running
- at least 1 hardhat node dummy address imported in metamask
- Metamask configured with localhost network with chainID: 31337

If you meet the requirements then simply do: `npm run start`

