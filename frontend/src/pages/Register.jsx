import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import Spinner from "../components/Spinner";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleRegister = async () => {
    try {
      setError("");
      setLoading(true);
      
      if (!name || !email || !password) {
        setError("Please fill in all fields");
        return;
      }
      
      if (!validateEmail(email)) {
        setError("Please enter a valid email address");
        return;
      }
      
      if (password.length < 6) {
        setError("Password must be at least 6 characters long");
        return;
      }
      
      const res = await API.post("/auth/register", { name, email, password });
      alert(res.data.msg || "User created successfully!");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-96 border border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Register</h2>

        {error && (
          <div className="bg-red-900 text-red-300 p-3 rounded-lg mb-4 text-sm border border-red-700">
            {error}
          </div>
        )}

        <input
          className="w-full mb-4 p-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full mb-4 p-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-4 p-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:cursor-not-allowed text-white p-3 rounded-lg mb-4 transition-colors font-medium flex items-center justify-center gap-2"
        >
          {loading && <Spinner />}
          {loading ? "Creating account..." : "Register"}
        </button>
        
        <p className="text-center text-gray-400">
          Already have an account? <Link to="/" className="text-blue-400 hover:text-blue-300">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
