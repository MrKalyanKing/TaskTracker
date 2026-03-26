import express from "express"
import { getUser, userLogin, userLogout, UserRegsiter } from "../controllers/user.controllers.js"
import { authMiddleware } from "../middlewares/Auth.middleware.js"

const userRouter = express.Router()

userRouter.post('/register', UserRegsiter)

userRouter.post("/login", userLogin)

userRouter.post("/logout", userLogout)


userRouter.get('/getuser', authMiddleware, getUser)
export default userRouter

