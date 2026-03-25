import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required to create an user"]
    },
    email:{
        type:String,
        required:[true,"Email is required "],
        unique:[true,"Email is Already Exists"]
    },
    password:{
        type:String,
        required:[true,"Password is requiresd"],
        select:false
    }
})

userSchema.pre("save",async function() {
    if(!this.isModified("password")){
        return
    }
    const hash=await bcrypt.hash(this.password,10)
    this.password=hash
    return
})

userSchema.methods.comparePassword=async function(password){

    // console.log(password,this.password)

    return await bcrypt.compare(password,this.password)
}

const userModel=mongoose.model("user",userSchema)

export default userModel
