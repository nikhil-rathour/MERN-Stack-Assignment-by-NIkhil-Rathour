import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleRegister = async () => {
    try {
      setError("");
      
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
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Register</h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-3 text-sm">
            {error}
          </div>
        )}

        <input
          className="w-full mb-3 p-2 border rounded"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full mb-3 p-2 border rounded"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-3 p-2 border rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-green-600 text-white p-2 rounded mb-3"
        >
          Register
        </button>
        
        <p className="text-center">
          Already have an account? <Link to="/" className="text-blue-600">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
