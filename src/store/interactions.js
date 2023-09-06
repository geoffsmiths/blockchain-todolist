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

export const loadConfig = async (config, provider, dispatch) => {
  dispatch({ type: "CONFIG_LOADED", config });
};

export const loadTodoList = async (
  contractAddress,
  address,
  provider,
  dispatch
) => {
  let contract;
  contract = new ethers.Contract(contractAddress, TODOLIST_ABI, provider);
  const block = await provider.getBlockNumber();
  const tasks = await contract.queryFilter("TaskCreated", 0, block);
  const allTasks = tasks.map((event) => event.args);
  dispatch({ type: "TASKS_LOADED", allTasks });
};
