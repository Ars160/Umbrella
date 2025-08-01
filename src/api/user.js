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

export const update = async (user) => {
    try {
        const response = await API.put(`/${user.id}`, user , authHeaders())
        return {success: true, data: response.data}
    } catch (error) {
        console.error("Failed to update profile", error);
        return {success: false, data: error}
        
    }
}

export const changePassword = async ({id, currentPassword, newPassword}) => {
    try {
        const res = await API.put(`/changePassword/${id}`, {currentPassword, newPassword}, authHeaders())
        return {success: true, data: res.data}
    } catch (error) {
        console.error("Failed to change password");
        return {success: false, data: error}
    }
}
