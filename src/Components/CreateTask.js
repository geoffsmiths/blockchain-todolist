import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../store/interactions";

export const CreateTask = () => {
  const dispatch = useDispatch();
  const contract = useSelector((state) => state.contract.contract);
  const provider = useSelector((state) => state.provider.connection);
  const submitHandler = async (e) => {
    e.preventDefault();
    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value;
    await createTask(category, description, contract, provider, dispatch);
    document.getElementById("category").value = "";
    document.getElementById("description").value = "";
  };
  return (
    <div>
      <h4>CreateTask</h4>
      <div>
        <form onSubmit={(e) => submitHandler(e)}>
          <table>
            <tbody>
              <tr>
                <td>Category</td>
                <td>
                  <input type="text" id="category"></input>
                </td>
              </tr>
              <tr>
                <td>Description</td>
                <td>
                  <input type="text" id="description"></input>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <button type="submit">Submit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};
