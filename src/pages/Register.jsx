import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import toast from "react-hot-toast";
import axios from "axios";

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;
    const confirm = form.confirm.value;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (password !== confirm) return toast.error("Passwords do not match!");
    if (!passwordRegex.test(password))
      return toast.error("Password must have 6+ chars, 1 uppercase & 1 lowercase!");

    setLoading(true);
    try {
      // ✅ Step 1: Firebase-এ user তৈরি করো
      const result = await createUser(email, password);

      // ✅ Step 2: Profile update করো (displayName, photoURL)
      await updateUserProfile({ displayName: name, photoURL: photo });

      // ✅ Step 3: JWT নাও — এখন user confirmed logged in
     axios.post(`${import.meta.env.VITE_API_URL}/jwt`,
        { email: result.user.email },
        { withCredentials: true }
      );

      toast.success("Registration successful!");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-orange-500 mb-6">Register</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input name="name" type="text" placeholder="Full Name" required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-400" />
          <input name="email" type="email" placeholder="Email" required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-400" />
          <input name="photo" type="text" placeholder="Photo URL" required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-400" />
          <input name="password" type="password" placeholder="Password" required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-400" />
          <input name="confirm" type="password" placeholder="Confirm Password" required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-400" />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 font-bold disabled:opacity-60 disabled:cursor-not-allowed transition-colors">
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-500 font-semibold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
