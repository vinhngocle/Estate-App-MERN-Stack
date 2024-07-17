import { Link } from "react-router-dom";

function App() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/todo-list">Todo List</Link>
        </li>
        <li>
          <Link to="/gym-app">Gym App</Link>
        </li>
      </ul>
    </div>
  );
}

export default App;
