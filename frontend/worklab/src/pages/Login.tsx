import React, { useState } from "react";
import useLogin from "../hooks/useLogin";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(email, password);
  };
  return (
    <div className="flex w-full h-screen bg-slate-900 items-center justify-center">
      <form
        className={`flex flex-col w-10/12 sm:w-1/3 sm:h-2/3 bg-gray-200 ${email ? password ? "shadow-emerald-600" : "shadow-red-600" : "shadow-red-600"} shadow-2xl border-2`}
        onSubmit={handleSubmit}
      >
        <h3 className="text-2xl text-center mt-20 font-bold">Login</h3>
        <label className="sm:ml-28 ml-8 mt-14 text-xl">Email:</label>
        <input
          className={`border-2 w-10/12 sm:w-2/3 self-center p-2 rounded-lg focus:shadow-md ${
            email ? "focus:shadow-emerald-200 " : "focus:shadow-rose-200 "
          } outline-none`}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label className="sm:ml-28 ml-8 mt-10 text-xl">Password:</label>
        <input
          className={`border-2 w-10/12 sm:w-2/3 self-center p-2 rounded-lg focus:shadow-md ${
            password ? "focus:shadow-emerald-200 " : "focus:shadow-rose-200 "
          } outline-none`}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Link to="/signup">
          <button
            disabled={isLoading}
            className="sm:self-start sm:ml-28 ml-8 mt-2 hover:text-teal-400"
          >
            Create an account
          </button>
        </Link>
        <button
          disabled={isLoading}
          className="mt-10 w-1/3 p-4 rounded-lg duration-300 self-center bg-emerald-700 hover:bg-emerald-400 text-white hover:text-black border hover:shadow-xl"
        >
          Login
        </button>

        {error && (
          <div className="self-center mt-10 border-2 w-2/3 text-center py-2 border-rose-500 bg-rose-200 text-rose-600 font-semibold text-lg rounded-lg">
            {error}
          </div>
        )}
      </form>
    </div>
  );
}
