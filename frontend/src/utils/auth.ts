import axios from "axios";

const API_URL = "http://localhost:5000/auth";

// Login Function
export const login = async (email: string, password: string): Promise<void> => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  const { token } = response.data;
  localStorage.setItem("token", token);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

// Register Function
export const register = async (
  name: string,
  email: string,
  password: string
): Promise<void> => {
  await axios.post(`${API_URL}/register`, { name, email, password });
};

// Logout Function
export const logout = (): void => {
  localStorage.removeItem("token");
  delete axios.defaults.headers.common["Authorization"];
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
