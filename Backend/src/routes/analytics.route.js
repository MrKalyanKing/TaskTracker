import express from "express"
import { authMiddleware } from "../middlewares/Auth.middleware.js"
import { getTaskAnalytics } from "../controllers/analytics.controller.js"

const analyticsRouter = express.Router()

analyticsRouter.get("/analytics", authMiddleware, getTaskAnalytics)

export default analyticsRouter