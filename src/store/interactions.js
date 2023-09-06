import { ethers } from "ethers";
import TODOLIST_ABI from "../abis/TodoList.json";

export const loadProvider = (dispatch) => {
  const connection = new ethers.providers.Web3Provider(window.ethereum);
  dispatch({ type: "PROVIDER_LOADED", connection });

  return connection;
};

export const loadNetwork = async (provider, dispatch) => {
  const { chainId } = await provider.getNetwork();
  dispatch({ type: "NETWORK_LOADED", chainId });

  return chainId;
};

export const loadAccount = async (provider, dispatch) => {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  const account = ethers.utils.getAddress(accounts[0]);
  dispatch({ type: "ACCOUNT_LOADED", account });

  return account;
};

export const loadContract = async (address, provider, dispatch) => {
  const contract = new ethers.Contract(address, TODOLIST_ABI, provider);

  dispatch({ type: "CONTRACT_LOADED", contract });

  return contract;
};

export const loadConfig = async (config, provider, dispatch) => {
  dispatch({ type: "CONFIG_LOADED", config });
};

export const loadTodoList = async (contract, provider, dispatch) => {
  const signer = await provider.getSigner();
  await contract.connect(signer);
  const block = await provider.getBlockNumber();
  const tasks = await contract.queryFilter("TaskCreated", 0, block);
  const allTasks = tasks.map((event) => event.args);
  dispatch({ type: "TASKS_LOADED", allTasks });
};

export const subscribeToEvents = (contract, provider, dispatch) => {
  contract.on(
    "TaskCreated",
    (user, id, category, description, complete, event) => {
      const task = event.args;
      dispatch({ type: "TASK_CREATED", task });
      loadTodoList(contract, provider, dispatch);
    }
  );
};

export const createTask = async (
  category,
  description,
  contract,
  provider,
  dispatch
) => {
  try {
    const signer = await provider.getSigner();
    const tx = await contract.connect(signer).addTask(category, description);
    await tx.wait();
  } catch (error) {
    dispatch({ type: "TASK_CREATE_FAIL" });
  }
};
