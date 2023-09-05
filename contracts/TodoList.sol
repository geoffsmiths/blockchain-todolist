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

    mapping(address => mapping(uint256 => Task)) public assignees;

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
        address assignee,
        string memory category,
        string memory description
    ) external {
        require(msg.sender == wife, "Only your wife can add tasks");
        counter = counter + 1;

        assignees[assignee][counter].id = counter;
        assignees[assignee][counter].category = category;
        assignees[assignee][counter].description = description;
        assignees[assignee][counter].complete = false;

        emit TaskCreated(counter, category, description, false);
    }

    function completeTask(address assignee, uint256 _id) external {
        require(msg.sender == wife, "Only your wife can complete tasks");

        assignees[assignee][_id].complete = true;

        emit TaskCompleted(
            _id,
            assignees[assignee][_id].category,
            assignees[assignee][_id].description,
            true
        );
    }
}
