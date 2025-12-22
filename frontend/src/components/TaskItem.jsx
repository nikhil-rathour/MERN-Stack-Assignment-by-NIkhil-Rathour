import { useState } from "react";
import API from "../services/api";

function TaskItem({ task, refresh }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);

  const deleteTask = async () => {
    try {
      await API.delete(`/tasks/${task._id}`);
      refresh();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const updateTask = async () => {
    try {
      if (!title.trim()) {
        alert("Task title is required");
        return;
      }
      
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
    }
  };

  if (isEditing) {
    return (
      <div className="bg-white p-4 rounded shadow mb-2">
        <input
          className="w-full mb-2 p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full mb-2 p-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="w-full mb-2 p-2 border rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <div className="flex gap-2">
          <button onClick={updateTask} className="bg-blue-600 text-white px-3 py-1 rounded">
            Save
          </button>
          <button onClick={() => setIsEditing(false)} className="bg-gray-600 text-white px-3 py-1 rounded">
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded shadow mb-2">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-bold text-lg">{task.title}</h3>
          <p className="text-gray-600 mb-2">{task.description}</p>
          <span className={`px-2 py-1 rounded text-sm ${
            task.status === 'completed' ? 'bg-green-200 text-green-800' :
            task.status === 'in-progress' ? 'bg-yellow-200 text-yellow-800' :
            'bg-gray-200 text-gray-800'
          }`}>
            {task.status}
          </span>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setIsEditing(true)} className="text-blue-600">
            Edit
          </button>
          <button onClick={deleteTask} className="text-red-600">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
