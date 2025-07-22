const express = require("express")
const cors = require("cors")
const app = express()


app.use(cors())
app.use(express.json())

app.get("/test", (req,res) => {
    res.json({message: 'Server is running'})
})

app.listen(5000, () =>  console.log("Server is running on 5000 port"))