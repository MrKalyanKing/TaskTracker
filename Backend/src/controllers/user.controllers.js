import validator from "validator"
import userModel from "../models/user.model.js"
import cookie from "cookie-parser"
import jwt from "jsonwebtoken"
const UserRegsiter=async(req,res)=>{
    try{
    const {name,email,password}=req.body

    if(!name,!email,!password){
        return res.status(400).json({
            message:"All Fields are required"
        })
    }

    if(!validator.isEmail(email)){

        return res.status(400).json({
            message:"Enter valid Email"
        })
    }   

    const user=await userModel.findOne({email:email})

    if(user){
        return res.status(200).json({
            message:"User is Already Exists",user:{email:user.email}
        })
    }

    const userData=userModel({
        name:name,
        email:email,
        password:password
    })

    userData.save()

    const token=jwt.sign({userId:userData._id},process.env.JWT_SECRET,{expiresIn:"2d"})
    res.cookie("token",token)

    return res.status(200).json({
            message:"User is Register succesfully",userData,token
    })

    }catch(err){
        return res.status(400).json({
            message:err.message,
            
        })
    }
}


const userLogin=async(req,res)=>{
    try{
    const {email,password}=req.body ||{}

    if(!email,!password){
        return res.status(401).json({
            message:"All Fields are reqiured"
        })
    }

    const user=await userModel.findOne({email}).select("+password")

    if(!user){
        return res.status(401).json({
            message:"User is Not Exists "
        })
    }

    const isValidPass= await user.comparePassword(password)

     if (!isValidPass) {
        return res.status(401).json({
            message: "Email or password is INVALID"
        })
    }

    const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"2d"})

    res.cookie("token",token)
    return res.status(200).json({
            message:"User LoggedIn",
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
            },
            token
    })
    

    }catch(err){
        return res.status(400).json({
            message:err.message
        })
    }

}

export{UserRegsiter,userLogin}