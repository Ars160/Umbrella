const mongoose = require("mongoose")

const connectDB = async () => {
    try{
    await mongoose.connect(`${process.env.MONGO_URL}`)
    console.log("MongoDB is connected");
    
    }catch(err){
        console.error("MongoDB connected error", err);
    }
}

module.exports = connectDB;
