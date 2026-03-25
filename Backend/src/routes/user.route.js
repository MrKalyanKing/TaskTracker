import express from "express"
import { userLogin, UserRegsiter } from "../controllers/user.controllers.js"
import { authMiddleware } from "../middlewares/Auth.middleware.js"

const userRouter =express.Router()

userRouter.post('/register',UserRegsiter)

userRouter.post("/login",authMiddleware,userLogin)

export default userRouter

