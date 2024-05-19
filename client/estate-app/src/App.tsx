import "./layout.scss";
import Navbar from "./components/navbar/Navbar";
import HomePage from "./routes/homePage/homePage";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className="layout">
      <div className="navbar">
        <Navbar/>
      </div>
      <div className="content">
        <HomePage/>
      </div>
    </div>
  );
}

export default App;
