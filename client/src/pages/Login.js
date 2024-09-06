import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { Input } from "../components/Input";
import Button from "../components/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("partner");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);
  const baseUrl = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Email is required");
      return;
    }
    if (!password || password.length < 8) {
      setError("Password must have at least 8 characters");
      return;
    }

    const url =
      role === "partner"
        ? `${baseUrl}/partner/auth/login`
        : `${baseUrl}/admin/login`;
    console.log(url);

    try {
      const response = await axios.post(url, {
        email,
        password,
      });

      localStorage.setItem("token", response.data.access_token);
      setUser(response.data.user);
      navigate("/dashboard");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && (
          <p className="text-red-500 text-small text-center font-light mb-4">
            {error}
          </p>
        )}
        <form>
          <div className="mb-8">
            <label className="block ml-1">Role</label>
            <select
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value={"partner"}>Partner</option>
              <option value={"admin"}>Admin</option>
            </select>
          </div>

          <Input
            label={"Email"}
            name={"email"}
            type={"email"}
            placeholder={"Email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label={"Password"}
            type={"password"}
            placeholder={"Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button text={"Login"} onClickHandler={handleSubmit} />
        </form>
      </div>
    </div>
  );
};

export default Login;
