import { CreateTask } from "./CreateTask";
import { Listing } from "./Listing";

function App() {
  return (
    <div>
      <h1>Todo List</h1>

      <Listing />

      <CreateTask />
    </div>
  );
}

export default App;
