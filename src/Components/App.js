import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadTodoList, loadProvider, loadNetwork } from "../store/interactions";
import config from "../config.json";

import { CreateTask } from "./CreateTask";
import { Listing } from "./Listing";

function App() {
  const dispatch = useDispatch();
  const loadBlockchainData = async () => {
    // Connect Ethers to Blockchain
    const provider = loadProvider(dispatch);
    const chainId = await loadNetwork(provider, dispatch);

    const address = config[chainId].TODOLIST.address;

    loadTodoList(address, provider, dispatch);
  };

  useEffect(() => {
    loadBlockchainData();
  });

  return (
    <div>
      <h1>Todo List</h1>

      <Listing />

      <CreateTask />
    </div>
  );
}

export default App;
