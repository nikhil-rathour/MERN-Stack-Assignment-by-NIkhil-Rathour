import { useState } from "react";
import API from "../services/api";
import Spinner from "./Spinner";

function TaskItem({ task, refresh }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const deleteTask = async () => {
    try {
      setDeleting(true);
      await API.delete(`/tasks/${task._id}`);
      refresh();
    } catch (error) {
      console.error("Error deleting task:", error);
    } finally {
      setDeleting(false);
    }
  };

  const updateTask = async () => {
    try {
      if (!title.trim()) {
        alert("Task title is required");
        return;
      }
      
      setLoading(true);
      await API.put(`/tasks/${task._id}`, { 
        title: title.trim(), 
        description: description.trim(), 
        status 
      });
      setIsEditing(false);
      refresh();
    } catch (error) {
      console.error("Error updating task:", error);
      alert(error.response?.data?.msg || "Error updating task");
    } finally {
      setLoading(false);
    }
  };

  if (isEditing) {
    return (
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
        <input
          className="w-full mb-4 p-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full mb-4 p-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
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
        <div className="flex gap-3">
          <button 
            onClick={updateTask} 
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            {loading && <Spinner size="w-4 h-4" />}
            {loading ? "Saving..." : "Save"}
          </button>
          <button 
            onClick={() => setIsEditing(false)} 
            disabled={loading}
            className="bg-gray-600 hover:bg-gray-700 disabled:bg-gray-800 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-bold text-xl text-white mb-2">{task.title}</h3>
          <p className="text-gray-300 mb-3">{task.description}</p>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            task.status === 'completed' ? 'bg-green-900 text-green-300 border border-green-700' :
            task.status === 'in-progress' ? 'bg-yellow-900 text-yellow-300 border border-yellow-700' :
            'bg-gray-700 text-gray-300 border border-gray-600'
          }`}>
            {task.status.charAt(0).toUpperCase() + task.status.slice(1).replace('-', ' ')}
          </span>
        </div>
        <div className="flex gap-3 ml-4">
          <button 
            onClick={() => setIsEditing(true)} 
            disabled={deleting}
            className="text-blue-400 hover:text-blue-300 disabled:text-blue-600 disabled:cursor-not-allowed font-medium"
          >
            Edit
          </button>
          <button 
            onClick={deleteTask} 
            disabled={deleting}
            className="text-red-400 hover:text-red-300 disabled:text-red-600 disabled:cursor-not-allowed font-medium flex items-center gap-1"
          >
            {deleting && <Spinner size="w-3 h-3" />}
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
