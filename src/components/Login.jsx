import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";


export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  const { login } = useContext(AuthContext);

  function ChangeHandler(e) {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  }

  async function submitHandler(e) {
    e.preventDefault();
    setError(null);

    try {
      await login(email, password,navigate);
    } catch (error) {
      console.error(error);
      setError("Invalid email or password.");
      setEmail("");
      setPassword("");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
          Sign In
        </h2>
        
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={ChangeHandler}
              name="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={ChangeHandler}
              name="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Sign In
          </button>

          <button
            type="submit"
            className="w-full bg-blue-600 flex  items-center justify-center gap-1.5 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
          >
          <FaGoogle/>
            <p>Continue With Google</p>
          </button>
        </form>
      </div>
    </div>
  );
};
