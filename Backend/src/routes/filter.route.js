import express from "express"
import { authMiddleware } from "../middlewares/Auth.middleware.js"
import { FilterTask } from "../controllers/filter.controller.js"

const filterRouter=express.Router()

filterRouter.get('/filter',authMiddleware,FilterTask)


export default filterRouter