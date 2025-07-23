const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const app = express()


app.use(cors())
app.use(express.json())


mongoose.connect(`${process.env.MONGO_URL}`)
    .then(() => console.log("MongoDB is connected"))
    .catch(() => console.log(err))


app.get("/tes", (req,res) => {
    res.json({message: 'Server is running'})
})


app.listen(process.env.PORT, () =>  
    console.log(`Server is running on ${process.env.PORT} port`
))

