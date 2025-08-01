import {jwtDecode} from "jwt-decode"

const getUserRole = () => {
  const token = localStorage.getItem("token")
  if (!token) return null

  try {
    const decoded = jwtDecode(token)
    return decoded.role
  } catch (err) {
    console.error("Invalid token")
    return null
  }
}

export default getUserRole