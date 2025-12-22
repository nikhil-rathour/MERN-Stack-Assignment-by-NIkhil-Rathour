import { useState } from "react";
import API from "../services/api";

function TaskForm({ refresh }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [error, setError] = useState("");

  const addTask = async () => {
    try {
      setError("");
      
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
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-3 text-sm">
          {error}
        </div>
      )}
      
      <input
        className="w-full mb-3 p-2 border rounded"
        placeholder="Task title *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full mb-3 p-2 border rounded"
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        className="w-full mb-3 p-2 border rounded"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <button onClick={addTask} className="bg-green-600 text-white px-4 py-2 rounded">
        Add Task
      </button>
    </div>
  );
}

export default TaskForm;
