import mongoose from "mongoose"
import taskModel from "../models/task.model.js"
import jwt from "jsonwebtoken"

// task creating
const taskCreate=async(req,res)=>{

    try{

    const {title,description,status,priority,dueDate}=req.body

    if(!title || !description || !status || !priority || !dueDate){
        return res.status(400).json({
            message:"All Fields are required"
        })
    }
    
    const allowedStatus=["todo","in-progress","done"]

    if(status && !allowedStatus.includes(status)){
         return res.status(400).json({
            message:" status can be either todo ,in-progress,done"
        })
    }

    const allowedPriority=["low","medium","high"]
    if(priority && !allowedPriority.includes(priority)){
         return res.status(400).json({
            message:" priority can be either low,medium,high"
        })
    }
    const task=await taskModel({
        user:req.user._id,
        title:title,
        description:description,
        status:status,
        priority:priority,
        dueDate:new Date(dueDate)
    })

    task.save()

    return res.status(200).json({
        message:"Task is created",
        task:{
            id:task._id,
            name:task.title,
            desc:title.description,
            status:task.status,
            priority:task.priority,
            due:task.dueDate
        }
    })


    }catch(err){
         return res.status(400).json({
            message:err.message
        })
    }
}


// task updating

const updateTask=async(req,res)=>{
    try{
    const {id}=req.params

    // console.log(id)
    if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID" });
    }
    const updatedTasks=await taskModel.findByIdAndUpdate(
        id,
        req.body,
        {returnDocument:"after"}
    )
    
    if(!updatedTasks){
        return res.status(400).json({
            message:"Task is not found "
        })
    }

    return res.status(200).json({
        message:"Task is Updated Succesfully",
        updateTask
    })

    }catch(err){
         return res.status(400).json({
            message:"Internal server arror",
            err:err.message
        })
    }
}

//deleting the task





export {taskCreate,updateTask,deleteTask,ViewAllTask}
