import { useState } from "react";
import API from "../services/api";
import Spinner from "./Spinner";

function TaskForm({ refresh }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const addTask = async () => {
    try {
      setError("");
      setLoading(true);
      
      if (!title.trim()) {
        setError("Task title is required");
        return;
      }
      
      await API.post("/tasks", { title: title.trim(), description: description.trim(), status });
      setTitle("");
      setDescription("");
      setStatus("pending");
      refresh();
    } catch (error) {
      setError(error.response?.data?.msg || "Error adding task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6 border border-gray-700">
      <h3 className="text-xl font-semibold mb-4 text-white">Add New Task</h3>
      
      {error && (
        <div className="bg-red-900 text-red-300 p-3 rounded-lg mb-4 text-sm border border-red-700">
          {error}
        </div>
      )}
      
      <input
        className="w-full mb-4 p-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Task title *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full mb-4 p-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        placeholder="Task description"
        rows="3"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        className="w-full mb-4 p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <button 
        onClick={addTask} 
        disabled={loading}
        className="bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg transition-colors font-medium flex items-center gap-2"
      >
        {loading && <Spinner />}
        {loading ? "Adding..." : "Add Task"}
      </button>
    </div>
  );
}

export default TaskForm;
