import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center bg-gray-800 p-4 text-white shadow-lg">
      <h1 className="text-xl font-bold text-blue-400">Task Manager</h1>
      <div className="flex items-center gap-4">
        {user && <span className="text-gray-300">Hello, {user.name.toUpperCase()}</span>}
        <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
