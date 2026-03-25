import taskModel from "../models/task.model.js"


const FilterTask=async(req,res)=>{

    try{
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
    const query={
        user:req.user._id
    }
    if(title){
        query.title={$regex :`^${title}$`,$options:"i"}
    }

   if (status) {
        query.status = { $regex: `^${status}$`, $options: "i" };
    }

    if (priority) {
        query.priority = { $regex: `^${priority}$`, $options: "i" };
    }

    const task=await taskModel.find(query)
    res.status(200).json({
      message: "Filtered tasks fetched",
      task,
    });

    }catch(err){
        res.status(400).json({
            message:err.message
        })
    }
}

export {FilterTask}