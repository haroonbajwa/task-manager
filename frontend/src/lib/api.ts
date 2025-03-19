import axios, { AxiosError } from "axios";
import { Task } from "@/types/task";
import { getToken } from "@/utils/auth";
import { toast } from "sonner";

const API_URL = "http://localhost:5000/tasks";

// Attach token before every request
axios.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Define error response type
interface ApiErrorResponse {
  message?: string;
}

// Generic function to handle API errors
const handleApiError = (error: unknown, defaultMessage: string): never => {
  const errorMessage =
    error instanceof AxiosError && error.response?.data
      ? (error.response.data as ApiErrorResponse).message || defaultMessage
      : defaultMessage;

  toast.error(errorMessage);
  throw new Error(errorMessage);
};

// Fetch Tasks
export const fetchTasks = async (): Promise<Task[]> => {
  try {
    const response = await axios.get<Task[]>(API_URL);
    return response.data;
  } catch (error) {
    return handleApiError(error, "Failed to fetch tasks");
  }
};

// Create Task
export const createTask = async (task: Omit<Task, "id">): Promise<Task> => {
  try {
    const response = await axios.post<Task>(API_URL, task);
    toast.success("Task created successfully!");
    return response.data;
  } catch (error) {
    return handleApiError(error, "Failed to create task");
  }
};

// Update Task
export const updateTask = async (
  id: number,
  task: Omit<Task, "id">
): Promise<Task> => {
  try {
    const response = await axios.put<Task>(`${API_URL}/${id}`, task);
    toast.success("Task updated successfully!");
    return response.data;
  } catch (error) {
    return handleApiError(error, "Failed to update task");
  }
};

// Delete Task
export const deleteTask = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    toast.success("Task deleted successfully!");
  } catch (error) {
    handleApiError(error, "Failed to delete task");
  }
};
