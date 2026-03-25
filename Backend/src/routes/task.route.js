import express from "express"
import { taskCreate } from "../controllers/task.controller.js"
import { authMiddleware } from "../middlewares/Auth.middleware.js"


const taskRouter= express.Router()

taskRouter.post("/create/task",authMiddleware,taskCreate)


export default taskRouter