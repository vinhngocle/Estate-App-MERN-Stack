import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import apiRequest from "../../lib/apiRequest";
import Alert from "../../components/alert/Alert";

const Register = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await apiRequest.post("/auth/register", {
        username,
        email,
        password,
      });

      if (res.data) {
        setMessage(res.message);
        navigate("/login");
      }
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input
            name="username"
            type="text"
            placeholder="Username"
            title="username"
            required
          />
          <input
            name="email"
            type="text"
            placeholder="Email"
            title="email"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            title="password"
            required
          />
          <button disabled={isLoading}>Register</button>
          <Link to="/login">Do you have an account?</Link>
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

export default Register;
