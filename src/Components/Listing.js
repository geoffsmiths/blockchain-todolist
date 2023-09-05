import { useSelector } from "react-redux";

export const Listing = () => {
  const tasks = useSelector((state) => state.tasks.alltasks);

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
            tasks.data.map((task, index) => (
              <tr key={index}>
                <td>{task.id.toString()}</td>
                <td>{task.category}</td>
                <td>{task.description}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
