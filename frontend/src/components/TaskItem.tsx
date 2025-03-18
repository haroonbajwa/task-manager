"use client";

import { Task } from "@/types/task";
import { Pencil } from "lucide-react";
import DeleteConfirmation from "./DeleteConfirmation";

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

export default function TaskItem({ task, onEdit, onDelete }: TaskItemProps) {
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
    <li
      className={`relative p-4 border rounded-lg shadow-sm bg-white ${
        task.status === "completed" ? "opacity-70" : ""
      }`}
    >
      {/* Edit & Delete Icons (Top Right) */}
      <div className="absolute top-2 right-2 flex gap-2">
        <button
          onClick={() => onEdit(task)}
          className="text-gray-600 hover:text-yellow-500 cursor-pointer"
        >
          <Pencil size={18} />
        </button>
        <DeleteConfirmation onConfirm={() => onDelete(task.id)} />
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
  );
}
