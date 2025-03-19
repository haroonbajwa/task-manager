import axios, { AxiosError } from "axios";
import { toast } from "sonner";

const API_URL = "http://localhost:5000/auth";

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

// Login Function
export const login = async (email: string, password: string): Promise<void> => {
  try {
    const response = await axios.post<{ token: string }>(`${API_URL}/login`, {
      email,
      password,
    });
    const { token } = response.data;
    localStorage.setItem("token", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    toast.success("Login successful!");
  } catch (error) {
    handleApiError(error, "Login failed");
  }
};

// Register Function
export const register = async (
  name: string,
  email: string,
  password: string
): Promise<void> => {
  try {
    await axios.post(`${API_URL}/register`, { name, email, password });
    toast.success("Registration successful! Please login.");
  } catch (error) {
    handleApiError(error, "Registration failed");
  }
};

// Logout Function
export const logout = (): void => {
  localStorage.removeItem("token");
  delete axios.defaults.headers.common["Authorization"];
  toast.success("Logged out successfully");
};

// Get JWT Token
export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

// Attach Token to All Axios Requests
const token = getToken();
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
