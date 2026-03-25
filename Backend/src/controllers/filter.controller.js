import taskModel from "../models/task.model"


const FilterTask=async()=>{
    const {status,priority,title}=req.query

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

    if(status){
        
    }
}