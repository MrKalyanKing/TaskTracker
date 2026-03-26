import mongoose from "mongoose";
import taskModel from "../models/task.model.js";


export const getTaskAnalytics = async (req, res, next) => {
    try {
        const { from, to } = req.query;

        const matchStage = {
            user: req.user._id,
        };


        if (from && to) {
            matchStage.createdAt = {
                $gte: new Date(from),
                $lte: new Date(to),
            };
        }

        const stats = await taskModel.aggregate([
            { $match: matchStage },
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 },
                },
            },
        ]);


        const result = {
            todo: 0,
            "in-progress": 0,
            done: 0,
        };

        stats.forEach((item) => {
            result[item._id] = item.count;
        });

        res.status(200).json({
            success: true,
            stats: result,
        });

    } catch (error) {

        next(err)

    }
};

export default { getTaskAnalytics }