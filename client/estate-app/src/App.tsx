import { Link } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div>
      {/* <h1 className="text-center p-3 text-3xl font-bold">Dashboard</h1> */}
      <Navbar />
      <ul className="text-blue-400 p-4 list-disc">
        <li className="hover:text-blue-800">
          <Link to="/todo-list">Todo List</Link>
        </li>
        <li className="hover:text-blue-800">
          <Link to="/gym-app">Gym App</Link>
        </li>
        {/* <li className="hover:text-blue-800">
          <Link to="/product">Product</Link>
        </li> */}
      </ul>
    </div>
  );
}

export default App;
