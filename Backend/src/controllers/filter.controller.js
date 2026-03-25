import taskModel from "../models/task.model.js"
import mongoose from "mongoose"

const FilterTask = async (req, res, next) => {

    try {
        const { status, priority, title } = req.query

        // console.log(req.user._id)
        // console.log(status,priority,title)

        const allowedStatus = ["todo", "in-progress", "done"]

        if (status && !allowedStatus.includes(status)) {
            const err = new Error("status can be either todo ,in-progress,done")
            err.status = 400
            return next(err)
        }

        const allowedPriority = ["low", "medium", "high"]

        if (priority && !allowedPriority.includes(priority)) {
            const err = new Error("priority can be either low,medium,high")
            err.status = 400
            return next(err)
        }


        const query = {
            user: req.user._id
        }


        if (title) {
            query.title = { $regex: `^${title}$`, $options: "i" }
        }

        if (status) {
            query.status = { $regex: `^${status}$`, $options: "i" };
        }

        if (priority) {
            query.priority = { $regex: `^${priority}$`, $options: "i" };
        }

        //pagination logic

        const page = parseInt(req.query.page)
        const limit = Math.min(parseInt(req.query.limit), 20)
        const skip = (page - 1) * limit

        if (page < 1 || limit < 1) {
            const err = new Error("Invalid pages or number")
            err.status = 400
            return next(err)
        }

        //total pages calculation
        const total = await taskModel.countDocuments(query)

        const totalPages = Math.ceil(total / limit)


        const tasks = await taskModel.find(query).skip(skip).limit(limit).sort({ createdAt: -1 })

        //fetching and counting the documents from DB using aggreagate functions
        const stats = await taskModel.aggregate([
            {
                $match: {
                    user: new mongoose.Types.ObjectId(req.user._id)
                }
            },
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ]);

        //storing in object to send to frontend
        const result = {}

        stats.forEach((elem) => {
            result[elem._id] = elem.count
        });
        // console.log(result)
        res.status(200).json({
            message: "Filtered tasks fetched",
            total, totalPages, page,
            tasks, result
        });


    } catch (err) {
        next(err)
    }
}

export { FilterTask }