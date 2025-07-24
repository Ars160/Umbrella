import axios from "axios"


const API = axios.create({
    baseURL: 'http://localhost:5000/auth'
})

export const register = async (formData) => {
    try {
        const response = await API.post("/register", formData)
        console.log(response);
        return {success: true, data: response.data}
    } catch (error) {
        console.error("Failed to register", error);
        return {success: false, data: error}
    }
}

export const login = async (formData) => {
    try {
        const response = await API.post("/login", formData)
        console.log(response);
        return {success: true, data: response.data}
    } catch (error) {
        console.error("Failed to login", error);
        return {success: false, data: error}
    }
}
