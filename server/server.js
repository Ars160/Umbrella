const express = require("express")
const connectDB = require("./config/db")
const cors = require("cors")
require("dotenv").config()

const authRoutes = require("./router/authRoutes")
const userRoutes = require("./router/userRoutes")
const authMiddleware = require("./middlewares/authMiddleware")

const app = express()

connectDB()

app.use(cors())
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/user', userRoutes)

app.get('/tes', authMiddleware, (req, res) => {
    res.json("success")
})


app.listen(process.env.PORT, () =>  
    console.log(`Server is running on ${process.env.PORT} port`
))

