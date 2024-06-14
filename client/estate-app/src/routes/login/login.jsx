import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import apiRequest from "../../lib/apiRequest";
import Alert from "../../components/alert/Alert";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const { updateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const formData = new FormData(e.target);

    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await apiRequest.post("/auth/login", {
        email,
        password,
      });

      // localStorage.setItem("user", JSON.stringify(res.data.data));
      updateUser(res.data.data);
      if (res.data) {
        apiRequest.defaults.headers.post["Content-Type"] = "application/json";
        apiRequest.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.data.token}`;
        setMessage(res.message);
        navigate("/");
      }
    } catch (error) {
      setError(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input name="email" type="text" placeholder="Email" required />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
          />
          <button disabled={isLoading}>Login</button>
          <Link to="/register">Don't you have an account?</Link>
          {message && <Alert type="success" message={message} />}
          {error && <Alert type="error" message={error} />}
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
};

export default Login;
