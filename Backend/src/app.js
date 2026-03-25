import express from "express"
import userRouter from "./routes/user.route.js";
import cookieParser from "cookie-parser";


const app=express()

//middlewares
app.use(express.json())
app.use(cookieParser())


//user routes

app.use("/api/user",userRouter)

app.get('/',(req,res)=>{
    res.send("Hello")
})
export default app;