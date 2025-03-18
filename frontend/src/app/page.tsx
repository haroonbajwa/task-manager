"use client";

import { useState, useEffect } from "react";
import { fetchTasks, deleteTask } from "@/lib/api";
import { Task } from "@/types/task";
import TaskModal from "@/components/TaskModal";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks().then(setTasks);
  }, []);

  const refreshTasks = () => {
    fetchTasks().then(setTasks);
  };

  const handleDelete = async (id: number) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <TaskModal onTaskAdded={refreshTasks} />
      <ul className="mt-4">
        {tasks.map((task) => (
          <li key={task.id} className="p-4 border rounded mt-2">
            <h2 className="text-xl">{task.title}</h2>
            <p>{task.description}</p>
            <p className="text-sm text-gray-500">Status: {task.status}</p>
            <Button
              className="mt-2 bg-red-600 text-white"
              onClick={() => handleDelete(task.id)}
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
