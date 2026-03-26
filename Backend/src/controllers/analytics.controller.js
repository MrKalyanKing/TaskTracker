import mongoose from "mongoose";
import taskModel from "../models/task.model.js";

export const getTaskAnalytics = async (req, res, next) => {
    try {
        const { from, to } = req.query;

        const matchStage = {
            user: req.user._id,
        };

        // date filter
        if (from && to) {
            matchStage.createdAt = {
                $gte: new Date(from),
                $lte: new Date(to),
            };
        }

        const statsAgg = await taskModel.aggregate([
            { $match: matchStage },
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 },
                },
            },
        ]);

        const stats = {
            todo: 0,
            "in-progress": 0,
            done: 0,
        };

        statsAgg.forEach((item) => {
            stats[item._id] = item.count;
        });


        const trend = await taskModel.aggregate([
            { $match: matchStage },

            {
                $group: {
                    _id: {
                        date: {
                            $dateToString: {
                                format: "%Y-%m-%d",
                                date: {
                                    $toDate: "$dueDate",
                                },
                            },
                        },
                        status: "$status",
                    },
                    count: { $sum: 1 },
                },
            },

            // reshape per date
            {
                $group: {
                    _id: "$_id.date",
                    data: {
                        $push: {
                            status: "$_id.status",
                            count: "$count",
                        },
                    },
                },
            },

            {
                $project: {
                    _id: 0,
                    date: "$_id",

                    todo: {
                        $sum: {
                            $map: {
                                input: "$data",
                                as: "d",
                                in: {
                                    $cond: [{ $eq: ["$$d.status", "todo"] }, "$$d.count", 0],
                                },
                            },
                        },
                    },

                    "in-progress": {
                        $sum: {
                            $map: {
                                input: "$data",
                                as: "d",
                                in: {
                                    $cond: [
                                        { $eq: ["$$d.status", "in-progress"] },
                                        "$$d.count",
                                        0,
                                    ],
                                },
                            },
                        },
                    },

                    done: {
                        $sum: {
                            $map: {
                                input: "$data",
                                as: "d",
                                in: {
                                    $cond: [{ $eq: ["$$d.status", "done"] }, "$$d.count", 0],
                                },
                            },
                        },
                    },
                },
            },

            { $sort: { date: 1 } },
        ]);


        res.status(200).json({
            success: true,
            stats,
            trend,
        });
    } catch (err) {
        next(err);
    }
};

export default { getTaskAnalytics };