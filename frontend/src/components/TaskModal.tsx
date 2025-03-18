"use client";

import { useState } from "react";
import { createTask } from "@/lib/api";
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
  onTaskAdded,
}: {
  onTaskAdded: () => void;
}) {
  const [task, setTask] = useState<Omit<Task, "id">>({
    title: "",
    description: "",
    status: "pending",
  });

  const [open, setOpen] = useState(false); // Controls modal visibility

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createTask(task);
    setTask({ title: "", description: "", status: "pending" }); // Reset form
    setOpen(false); // Close modal after submitting
    onTaskAdded(); // Refresh task list
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 text-white">Add Task</Button>
      </DialogTrigger>
      <DialogContent className="p-6">
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
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
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <Button type="submit" className="w-full bg-blue-600 text-white">
            Save Task
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
