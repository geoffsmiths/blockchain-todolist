// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract TodoList {
    uint256 public counter;

    struct Task {
        address user;
        uint256 id;
        string category;
        string description;
        bool complete;
    }

    address public manager;

    mapping(address => mapping(uint256 => Task)) public tasks;

    constructor() {
        manager = msg.sender;
    }

    event TaskCreated(
        address user,
        uint256 id,
        string category,
        string description,
        bool complete
    );

    event TaskCompleted(
        address user,
        uint256 id,
        string category,
        string description,
        bool complete
    );

    function addTask(
        string memory category,
        string memory description
    ) external {
        counter = counter + 1;

        tasks[msg.sender][counter].id = counter;
        tasks[msg.sender][counter].category = category;
        tasks[msg.sender][counter].description = description;
        tasks[msg.sender][counter].complete = false;

        emit TaskCreated(msg.sender, counter, category, description, false);
    }

    function completeTask(uint256 _id) external {
        tasks[msg.sender][_id].complete = true;

        emit TaskCompleted(
            msg.sender,
            _id,
            tasks[msg.sender][_id].category,
            tasks[msg.sender][_id].description,
            true
        );
    }
}
