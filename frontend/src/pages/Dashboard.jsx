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
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">My Tasks</h2>
        <TaskForm refresh={fetchTasks} />
        <div>
          {tasks.map((task) => (
            <TaskItem key={task._id} task={task} refresh={fetchTasks} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;