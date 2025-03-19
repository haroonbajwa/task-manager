"use client";

import { useState, useEffect } from "react";
import { createTask, updateTask } from "@/lib/api";
import { Task } from "@/types/task";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function TaskModal({
  onTaskUpdated,
  taskToEdit,
}: {
  onTaskUpdated: () => void;
  taskToEdit?: Task;
}) {
  const [task, setTask] = useState<Omit<Task, "id">>({
    title: "",
    description: "",
    status: "pending",
  });

  const [open, setOpen] = useState(false); // Controls modal visibility

  // Statuses array
  const statuses = [
    { value: "pending", label: "Pending" },
    { value: "in-progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
  ];

  // Load task data when editing
  useEffect(() => {
    if (taskToEdit) {
      setTask({
        title: taskToEdit.title,
        description: taskToEdit.description,
        status: taskToEdit.status,
      });
      setOpen(true);
    }
  }, [taskToEdit]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (taskToEdit) {
      await updateTask(taskToEdit.id, task);
    } else {
      await createTask(task);
    }

    setTask({ title: "", description: "", status: "pending" });
    setOpen(false);
    onTaskUpdated(); // Refresh task list
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {!taskToEdit && (
          <Button className="bg-blue-600 text-white">Add Task</Button>
        )}
      </DialogTrigger>
      <DialogContent className="p-6">
        <DialogHeader>
          <DialogTitle>{taskToEdit ? "Edit Task" : "Create Task"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            name="title"
            placeholder="Title"
            value={task.title}
            onChange={handleChange}
            required
          />
          <Textarea
            name="description"
            placeholder="Description"
            value={task.description}
            onChange={handleChange}
          />
          <select
            name="status"
            value={task.status}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            {statuses.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
          <Button type="submit" className="w-full bg-blue-600 text-white">
            {taskToEdit ? "Update Task" : "Save Task"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
