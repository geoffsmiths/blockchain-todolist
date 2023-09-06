import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { loadAccount } from "../store/interactions";

export const ConnectBtn = () => {
  const dispatch = useDispatch();
  const provider = useSelector((state) => state.provider.connection);

  const connectHandler = async () => {
    await loadAccount(provider, dispatch);
  };

  return (
    <div>
      <button onClick={connectHandler}>Connect metamask</button>
    </div>
  );
};
