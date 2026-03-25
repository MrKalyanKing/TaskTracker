import mongoose from "mongoose"
import taskModel from "../models/task.model.js"
import jwt from "jsonwebtoken"

// task creating
const taskCreate=async(req,res,next)=>{

    try{

    const {title,description,status,priority,dueDate}=req.body

    if(!title || !description || !status || !priority || !dueDate){
        const err=new Error("All fields are required")
        err.status=400
        return next(err)
    }
    
    const allowedStatus=["todo","in-progress","done"]

    if(status && !allowedStatus.includes(status)){

        const err=new Error("status can be either todo ,in-progress,done")
        err.status=400
        return next(err)
    }

    const allowedPriority=["low","medium","high"]

    if(priority && !allowedPriority.includes(priority)){

        const err=new Error("priority can be either low,medium,high")
        err.status=400
        return next(err)

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
        task
    })


    }catch(err){
        next(err)
    }
}


// task updating

const updateTask=async(req,res,next)=>{
    try{
    const {id}=req.params
  

    // console.log(id)
    if (!mongoose.Types.ObjectId.isValid(id)) {

        const err=new Error("InValid ID")
        err.status=400
        return next(err)
        
    }

    const updatedTasks=await taskModel.findByIdAndUpdate(
        id,
        req.body,
        {returnDocument:"after"}
    )
    
    if(!updatedTasks){
        const err=new Error("Task is Not Found")
        err.status=404
        return next(err)
    }


    return res.status(200).json({
        message:"Task is Updated Succesfully",
        updateTask
    })


    }catch(err){
         next(err)
    }
}

//deleting the task

const deleteTask=async(req,res,next)=>{

    try{

    const {id}=req.params

        
    if(!mongoose.Types.ObjectId.isValid(id)){
        const err=new Error("Invalid ID")
        err.status=400
        return next(err)
        
    }

    const deletedOne=await taskModel.findByIdAndDelete(id)

     return res.status(200).json({
            message:"Task is Deleted sucessfully",
            deletedOne
    })

    }catch(err){
        next(err)
    }

}


//view all task
const ViewAllTask=async(req,res,next)=>{
    try{
    const token= req.cookies.token || req.headers.Authorization?.split(" ")[1]

    //pagination 
    const page=parseInt(req.query.page)
    const limit=Math.min(parseInt(req.query.limit),40)
    const skip=(page -1) * limit

  
    if(page  < 1  || limit <1){
        const err=new Error("Invalid Page number or limit")
        err.status=400
        return next(err)
        
    }

    if(!token){
        const err=new Error("Unauthorized access")
        err.status=401
        return next(err)
    }

    const decoded=jwt.verify(token,process.env.JWT_SECRET)

    //counting total pages
    
    const total= await taskModel.countDocuments({user:decoded.userId})

    const totalPages=Math.ceil(total/limit)

    const task=await taskModel.find({user:decoded.userId}).skip(skip).limit(limit).sort({createdAt:-1})

    return res.status(200).json({
        message:"task are fetched sucessfully",
        total, page,totalPages,task
    })

    }catch(err){
        next(err)
    }
}




export {taskCreate,updateTask,deleteTask,ViewAllTask}
