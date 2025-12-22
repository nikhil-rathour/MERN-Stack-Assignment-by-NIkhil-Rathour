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
    <div className="flex justify-between items-center bg-blue-600 p-4 text-white">
      <h1 className="font-bold">Todo App</h1>
      <div className="flex items-center gap-4">
        {user && <span>Hello, {user.name.toUpperCase()}</span>}
        <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
