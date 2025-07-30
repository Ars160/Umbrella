import axios from "axios"
import { authHeaders } from "../utils/authHeaders"

const API = axios.create({
    baseURL: 'http://localhost:5000/task'
})



export const create = async (task) => {
    try {
        const response = await API.post("/", task , authHeaders())
        return {success: true, data: response.data}
    } catch (error) {
        console.error("Failed to create task", error);
        return {success: false, data: error}
    }
}

export const getAll = async () => {
    try {
        const response = await API.get("/", authHeaders())
        return {success: true, data: response.data}
    } catch (error) {
        console.error("Failed to get tasks", error);
        return {success: false, data: error}
    }
}

export const getOne = async (id) => {
    try {
        const response = await API.get(`/${id}`, authHeaders())
        return {success: true, data: response.data}
    } catch (error) {
        console.error("Failed to get this task", error);
        return {success: false, data: error}
    }
}

export const update = async (task) => {
    try {
        const response = await API.put(`/${task.id}`, task , authHeaders())
        return {success: true, data: response.data}
    } catch (error) {
        console.error("Failed to update this task", error);
        return {success: false, data: error}
    }
}

export const deleted = async (id) => {
    try {
        const response = await API.delete(`/${id}`, authHeaders())
        return {success: true, data: response.data}
    } catch (error) {
        console.error("Failed to delete this task", error);
        return {success: false, data: error}
    }
}

export const getByProjectId = async (projectId) => {
    try {
      const response = await API.get(`/project/${projectId}`, authHeaders());
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Failed to get tasks by projectId", error);
      return { success: false, data: error };
    }
};  
  