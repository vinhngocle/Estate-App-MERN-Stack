import { Link } from "react-router-dom";

function App() {
  return (
    <div>
      <ul className="text-blue-400 p-4 list-disc ml-6">
        <li className="hover:text-blue-800">
          <Link to="/todo-list">Todo List</Link>
        </li>
        <li className="hover:text-blue-800">
          <Link to="/gym-app">Gym App</Link>
        </li>
      </ul>
    </div>
  );
}

export default App;
