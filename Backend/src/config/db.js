import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()

const url=process.env.MONGO_URL


function connectToDB(){
    mongoose.connect(url)
    .then(()=>{
        console.log("Connected to DB")
    })
    .catch((err)=>{
        console.log(err)
    })
}

export default connectToDB