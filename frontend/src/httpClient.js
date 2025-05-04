import axios from "axios";
// Use Vite environment variables
const url =
  import.meta.env.VITE_API_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:5000"
    : "https://cavista-vedaverse-server-beta.vercel.app/");

export default axios.create({
  withCredentials: true,
  accessControlAllowCredentials: true,
  credientials: "same-origin",
  headers: {
    "Content-type": "application/json",
    // "Authorization": "Bearer " + localStorage.getItem("token")
  },
  baseURL: url,
});
