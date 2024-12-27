import axios from "axios";

// Create an Axios instance with default configurations
const apiClient = axios.create({
    baseURL: "http://localhost:5000", // Replace with your backend's base URL
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000, // Set a timeout for requests
});

export default apiClient;
