export const BASE_URL = "http://localhost:8000";

//utils/apiPaths.js

export const API_PATHS = {
    AUTH: {
        REGISTER: "/api/auth/register", //Register a new user (admin or member)
        LOGIN: "/api/auth/login", //Authentication user & return JWT token
        GET_PROFILE: "/api/auth/profile", //Get logged-in user details

    },

    USERS: {
       GET_ALL_USERS: "/api/users",//Get all users (Admin only)
       GET_USER_BY_ID: (userId) => `/api/users/${userId}`, //Get user by ID
       CREATE_USER: "/api/users", //Create a new user (Admin Only)
       UPDATE_USER: (userId) => `/api/users/${userId}`,//Update users details
       DELETE_USER: (userId) => `/api/users/${userId}`, // Delete a user
    },

    TASKS: {
        GET_DASHBOARD_DATA: "/api/tasks/dashboard-data",//Get Dashboard Data
        GET_USER_DASHBOARD_DATA: "/api/tasks/user-dashboard-data",//Get user dashboard data
        GET_ALL_TASKS: "/api/tasks",//Get all tasks (Admin : all, User: only assign tasks)
        GET_TASK_BY_ID: (taskId) => `/api/tasks/${taskId}`,// Get task by ID
        CREATE_TASK: "/api/tasks",//create a new task (Admin only)
        UPDATE_TASK: (taskId) => `/api/tasks/${taskId}`,//Update tasks details
        DELETE_TASK: (taskId) => `/api/tasks/${taskId}`, // Delete a task (Admin only)

        UPDATE_TASK_STATUS: (taskId) => `/api/tasks/${taskId}/status`,//Update tasks details
        UPDATE_TODO_CHECKLIST: (taskId) => `/api/tasks/${taskId}/todo`,//Update tasks details
    },

    REPORTS: {
        EXPORT_TASKS: "/api/reports/export/tasks", // Download all tasks as an Excel
        EXPORT_USERS: "/api/reports/export/users", // Download user-task report 

    },

    IMAGE: {
        UPLOAD_IMAGE: "api/auth/upload-image",
    },
}