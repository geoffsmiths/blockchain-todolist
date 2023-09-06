import { useSelector } from "react-redux";
import { myTasksSelector } from "../store/selectors";

export const Listing = () => {
  const tasks = useSelector(myTasksSelector);

  return (
    <div>
      <h3>Listing</h3>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>category</th>
            <th>description</th>
          </tr>
        </thead>
        <tbody>
          {tasks &&
            tasks.map((task, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{task.category}</td>
                <td>{task.description}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
