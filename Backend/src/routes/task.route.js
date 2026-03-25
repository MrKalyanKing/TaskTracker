import express from "express"
import { deleteTask, taskCreate, updateTask, ViewAllTask } from "../controllers/task.controller.js"
import { authMiddleware } from "../middlewares/Auth.middleware.js"


const taskRouter= express.Router()

taskRouter.post("/create/",authMiddleware,taskCreate)

//updating the task

taskRouter.patch("/update/:id",authMiddleware,updateTask)

//deleting the task

taskRouter.delete("/delete/:id",authMiddleware,deleteTask)

//view all task

taskRouter.get("/view",authMiddleware,ViewAllTask)




export default taskRouter