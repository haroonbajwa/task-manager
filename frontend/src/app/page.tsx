"use client";

import { useState, useEffect } from "react";
import { fetchTasks, deleteTask } from "@/lib/api";
import { Task } from "@/types/task";
import TaskModal from "@/components/TaskModal";
import TaskItem from "@/components/TaskItem";
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

  const pendingTasks = tasks.filter((task) => task.status !== "completed");
  const completedTasks = tasks.filter((task) => task.status === "completed");

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <TaskModal onTaskUpdated={refreshTasks} />
      {taskToEdit && (
        <TaskModal onTaskUpdated={refreshTasks} taskToEdit={taskToEdit} />
      )}

      {/* Pending & In-Progress Tasks */}
      <ul className="mt-4 space-y-4">
        {pendingTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </ul>

      {/* Divider Line for Completed Tasks */}
      {completedTasks.length > 0 && (
        <div className="my-6 border-t-2 border-gray-300 pt-4">
          <h2 className="text-lg font-semibold text-gray-600">
            Completed Tasks
          </h2>
        </div>
      )}

      {/* Completed Tasks */}
      <ul className="mt-4 space-y-4">
        {completedTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}
