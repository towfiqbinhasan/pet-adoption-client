import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import toast from "react-hot-toast";
import axios from "axios";

const Login = () => {
  const { loginUser, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setLoading(true);
    try {
      // ✅ Step 1: Firebase login
      const result = await loginUser(email, password);

      // ✅ Step 2: JWT নাও
      axios.post(`${import.meta.env.VITE_API_URL}/jwt`,
        { email: result.user.email },
        { withCredentials: true }
      );

      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error("Invalid email or password!");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      const result = await googleLogin();

      await axios.post(
        "http://localhost:5000/jwt",
        { email: result.user.email },
        { withCredentials: true }
      );

      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Google login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-orange-500 mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input name="email" type="email" placeholder="Email" required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-400" />
          <input name="password" type="password" placeholder="Password" required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-400" />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 font-bold disabled:opacity-60 disabled:cursor-not-allowed transition-colors">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="my-4 flex items-center gap-3">
          <hr className="flex-grow border-gray-200" />
          <span className="text-gray-400 text-sm">OR</span>
          <hr className="flex-grow border-gray-200" />
        </div>

        <button
          onClick={handleGoogle}
          disabled={loading}
          className="w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-50 font-semibold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed transition-colors">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" />
          Continue with Google
        </button>

        <p className="text-center text-gray-500 mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-orange-500 font-semibold hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
