import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadTodoList, loadProvider, loadNetwork } from "../store/interactions";
import config from "../config.json";

export const Listing = () => {
  const dispatch = useDispatch();
  const loadBlockchainData = async () => {
    // Connect Ethers to Blockchain
    const provider = loadProvider(dispatch);
    const chainId = await loadNetwork(provider, dispatch);

    const address = config[chainId].TODOLIST.address;

    loadTodoList(address, provider, dispatch);
  };

  useEffect(() => {
    // console.log(config);
    loadBlockchainData();
  });

  return <div>Listing</div>;
};
