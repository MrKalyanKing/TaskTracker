import taskModel from "../models/task.model.js"


const FilterTask=async(req,res,next)=>{

    try{
    const {status,priority,title}=req.query

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

    //pagination logic

    const page=parseInt(req.query.page) 
    const limit=Math.min(parseInt(req.query.limit),20)
    const skip=(page -1) * limit

    if(page < 1 || limit <1){
        const err=new Error("Invalid pages or number")
        err.status=400
        return next(err)
    }

    //total pages calculation
    const total=await taskModel.countDocuments({user:req.user._id})

    const totalPages=Math.ceil(total/limit)


    const task=await taskModel.find(query).skip(skip).limit(limit).sort({createdAt:-1})

    res.status(200).json({
      message: "Filtered tasks fetched",
      total,totalPages,page,
      task,
    });
    

    }catch(err){
        next(err)
    }
}

export {FilterTask}