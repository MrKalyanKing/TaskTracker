import mongoose from "mongoose"

const taskSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:[true,'User cannot create task without registering'],
        index:true
    },
    title:{
        type:String,
        required:[true,"Tiltle is required"]
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:{
            values: ["todo","in-progress","done"],
            message:"status can be either todo ,in-progress,done"      
        }
    },
    priority:{
        type:String,
        enum:{
            values: ["low","medium","high"],
            message:"priority can be either low,medium,high"      
        }
    },
    dueDate:{
        type:Date
    },
},
    { timestamp:true}
)

taskSchema.index({title:1,status:1,priority:1})

const taskModel=mongoose.model("task",taskSchema)

export default taskModel