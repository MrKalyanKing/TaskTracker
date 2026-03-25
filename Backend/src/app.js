import express from "express"
import userRouter from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import taskRouter from "./routes/task.route.js";
import filterRouter from "./routes/filter.route.js";


const app=express()

//middlewares
app.use(express.json())
app.use(cookieParser())



//user routes

app.use("/api/user",userRouter)

app.use("/api/task",taskRouter)

app.use("/api/",filterRouter)


//global middleware error handling

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});



app.get('/',(req,res)=>{
    res.send("Hello")
})
export default app;