"use client";

import { useState, useEffect } from "react";
import { fetchTasks, deleteTask } from "@/lib/api";
import { Task } from "@/types/task";
import TaskModal from "@/components/TaskModal";
import { Pencil, Trash } from "lucide-react";
import { toast } from "sonner";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  useEffect(() => {
    fetchTasks().then(setTasks);
  }, []);

  const refreshTasks = () => {
    fetchTasks().then(setTasks);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
      toast.success("Task deleted successfully!");
    } catch (error) {
      console.error("Failed to delete task:", error);
      toast.error("Error deleting task. Please try again.");
    }
  };

  const handleEdit = (task: Task) => {
    setTaskToEdit(task);
  };

  // Function to get status chip color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "in-progress":
        return "bg-blue-100 text-blue-700";
      case "completed":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <TaskModal onTaskUpdated={refreshTasks} />
      {taskToEdit && (
        <TaskModal onTaskUpdated={refreshTasks} taskToEdit={taskToEdit} />
      )}

      <ul className="mt-4 space-y-4">
        {tasks
          .slice()
          .reverse()
          .map((task) => (
            <li
              key={task.id}
              className="relative p-4 border rounded-lg shadow-sm bg-white"
            >
              {/* Edit & Delete Icons */}
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => handleEdit(task)}
                  className="text-gray-600 hover:text-yellow-500 cursor-pointer"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="text-gray-600 hover:text-red-500 cursor-pointer"
                >
                  <Trash size={18} />
                </button>
              </div>

              {/* Task Title & Description */}
              <h2 className="text-lg font-semibold">{task.title}</h2>
              <p className="text-gray-600 text-sm">{task.description}</p>

              {/* Status Chip */}
              <span
                className={`inline-block mt-3 px-3 py-1 text-sm font-medium rounded-lg ${getStatusColor(
                  task.status
                )}`}
              >
                {task.status === "in-progress"
                  ? "In Progress"
                  : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
}
