import express from "express"
import { authMiddleware } from "../middlewares/Auth.middleware"

const filterRouter=express.Router()

filterRouter.get('/filter',authMiddleware,)