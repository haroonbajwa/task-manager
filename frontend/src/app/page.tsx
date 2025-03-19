"use client";

import { useState, useEffect } from "react";
import { fetchTasks, deleteTask } from "@/lib/api";
import { Task } from "@/types/task";
import TaskModal from "@/components/TaskModal";
import TaskItem from "@/components/TaskItem";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  const refreshTasks = async () => {
    setLoading(true);
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (error) {
      console.error("Error refreshing tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((task) => task.id !== id));
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

      {/* Show Loader While Tasks are Loading */}
      {loading ? (
        <div className="text-center py-6">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading tasks...</p>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
