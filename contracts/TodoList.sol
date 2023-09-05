// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract TodoList {
    uint256 public counter;

    struct Task {
        uint256 id;
        string category;
        string description;
        bool complete;
    }

    address public wife;

    mapping(uint256 => Task) public tasks;

    constructor() {
        wife = msg.sender;
    }

    event TaskCreated(
        uint256 id,
        string category,
        string description,
        bool complete
    );

    event TaskCompleted(
        uint256 id,
        string category,
        string description,
        bool complete
    );

    function addTask(
        string memory category,
        string memory description
    ) external {
        require(msg.sender == wife, "Only your wife can add tasks");
        counter = counter + 1;

        tasks[counter].id = counter;
        tasks[counter].category = category;
        tasks[counter].description = description;
        tasks[counter].complete = false;

        emit TaskCreated(counter, category, description, false);
    }

    function completeTask(uint256 _id) external {
        require(msg.sender == wife, "Only your wife can complete tasks");

        tasks[_id].complete = true;

        emit TaskCompleted(
            _id,
            tasks[_id].category,
            tasks[_id].description,
            true
        );
    }
}
