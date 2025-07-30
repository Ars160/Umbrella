import axios from "axios"
import { authHeaders } from "../utils/authHeaders"

const API = axios.create({
    baseURL: 'http://localhost:5000/project'
})



export const create = async (project) => {
    try {
        const response = await API.post("/", project , authHeaders())
        return {success: true, data: response.data}
    } catch (error) {
        console.error("Failed to create project", error);
        return {success: false, data: error}
    }
}

export const getAll = async () => {
    try {
        const response = await API.get("/", authHeaders())
        return {success: true, data: response.data}
    } catch (error) {
        console.error("Failed to get projects", error);
        return {success: false, data: error}
    }
}

export const getOne = async (id) => {
    try {
        const response = await API.get(`/${id}`, authHeaders())
        return {success: true, data: response.data}
    } catch (error) {
        console.error("Failed to get this project", error);
        return {success: false, data: error}
    }
}

export const update = async (id, project) => {
    try {
        const response = await API.put(`/${id}`, project , authHeaders())
        return {success: true, data: response.data}
    } catch (error) {
        console.error("Failed to update this project", error);
        return {success: false, data: error}
    }
}

export const deleted = async (id) => {
    try {
        const response = await API.delete(`/${id}`, authHeaders())
        return {success: true, data: response.data}
    } catch (error) {
        console.error("Failed to delete this project", error);
        return {success: false, data: error}
    }
}
  
