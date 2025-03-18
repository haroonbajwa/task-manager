"use client";

import { useState, useEffect } from "react";
import { fetchTasks, deleteTask } from "@/lib/api";
import { Task } from "@/types/task";
import TaskModal from "@/components/TaskModal";
import { Button } from "@/components/ui/button";
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
    setTaskToEdit(task); // Set the task to be edited
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <TaskModal onTaskUpdated={refreshTasks} />
      {taskToEdit && (
        <TaskModal onTaskUpdated={refreshTasks} taskToEdit={taskToEdit} />
      )}
      <ul className="mt-4 flex flex-col-reverse">
        {tasks.map((task) => (
          <li key={task.id} className="p-4 border rounded mt-2">
            <h2 className="text-xl">{task.title}</h2>
            <p>{task.description}</p>
            <p className="text-sm text-gray-500">Status: {task.status}</p>
            <div className="flex gap-2 mt-2">
              <Button
                className="bg-yellow-500 text-white"
                onClick={() => handleEdit(task)}
              >
                Edit
              </Button>
              <Button
                className="bg-red-600 text-white"
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
