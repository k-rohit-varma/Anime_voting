import { USER_SERVER_KEY } from "@/Keys";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface login {
  email: string;
  password: string;
}

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: login = {
      email: email,
      password: password,
    };
    const res = await axios.post(USER_SERVER_KEY + "login", payload);
    console.log(res);
    const data = res.data.user
    if (res.status === 201) {
      navigate("/home",{state : {data}});
    }
  };
  return (
    <div className="bg-[#dcdde1] min-h-screen flex items-center justify-center px-5 py-10 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Log in to join the anime community and vote your favorites!
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-xl hover:bg-gray-800 transition font-semibold"
          >
            Log In
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-purple-600">
            Sign Up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
