
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Automatically attach token from localStorage to all requests
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// === Auth APIs ===
export const registerUser = (userData) => API.post("/auth/register", userData);
export const loginUser = (userData) => API.post("/auth/login", userData);

// === Email APIs ===
export const sendEmail = (emailData) => API.post("/email/send", emailData);
export const getInboxEmails = () => API.get("/email/inbox");
export const getSentEmails = () => API.get("/email/sent");