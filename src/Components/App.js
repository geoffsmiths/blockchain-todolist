import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadAccount,
  loadConfig,
  loadNetwork,
  loadProvider,
  loadTodoList,
} from "../store/interactions";

import { CreateTask } from "./CreateTask";
import { Listing } from "./Listing";
import { ConnectBtn } from "./ConnectBtn";
import config from "../config.json";

function App() {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.provider.account);
  const ca = useSelector((state) => state.provider.config);

  const loadBlockchainData = async () => {
    // Connect Ethers to Blockchain
    const provider = loadProvider(dispatch);
    const chainId = await loadNetwork(provider, dispatch);

    // Load the config for the chainID
    loadConfig(config[chainId].TODOLIST, provider, dispatch);

    // Reload page when network changes
    window.ethereum.on("chainChanged", () => {
      window.location.reload();
    });

    // Fetch current account and balance from metamask
    window.ethereum.on("accountsChanged", async () => {
      await loadAccount(provider, dispatch);
    });

    if (account) {
      loadTodoList(ca.address, account, provider, dispatch);
    }
  };

  useEffect(() => {
    loadBlockchainData();
  });

  return (
    <div>
      <h1>Todo List</h1>

      <Listing />

      <CreateTask />

      <ConnectBtn />
    </div>
  );
}

export default App;
