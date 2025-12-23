import { useState, useEffect } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";

function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6 text-white">My Tasks</h2>
        <TaskForm refresh={fetchTasks} />
        <div className="space-y-4">
          {tasks.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400 text-lg">No tasks yet. Create your first task above!</p>
            </div>
          ) : (
            tasks.map((task) => (
              <TaskItem key={task._id} task={task} refresh={fetchTasks} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;