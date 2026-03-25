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

    //pagination logic

    const page=parseInt(req.query.page) ||1
    const limit=Math.min(parseInt(req.query.limit)||10,20)
    const skip=(page -1) * limit

    if(page < 1 || limit <1){
        return res.status(400).json({
            message:"Invalid page or limit"
        })
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
        res.status(400).json({
            message:err.message
        })
    }
}

export {FilterTask}