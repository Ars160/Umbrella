import axios from "axios"
import { authHeaders } from "../utils/authHeaders"

const API = axios.create({
    baseURL: 'http://localhost:5000/user'
})



export const profile = async () => {
    try {
        const response = await API.get("/profile", authHeaders())
        return {success: true, data: response.data}
    } catch (error) {
        console.error("Not get profile data", error);
        return {success: false, data: error}
    }
}

export const getAll = async () => {
    try {
        const response = await API.get("/", authHeaders())
        return {success: true, data: response.data}
    } catch (error) {
        console.error("Failed to get user", error);
        return {success: false, data: error}
    }
}

export const getOne = async (id) => {
    try {
        const response = await API.get(`/${id}`, authHeaders())
        return {success: true, data: response.data}
    } catch (error) {
        console.error("Failed to get this user", error);
        return {success: false, data: error}
    }
}
