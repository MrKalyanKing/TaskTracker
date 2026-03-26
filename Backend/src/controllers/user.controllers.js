import validator from "validator"
import userModel from "../models/user.model.js"
import cookie from "cookie-parser"
import jwt from "jsonwebtoken"

const UserRegsiter = async (req, res, next) => {

    try {
        const { name, email, password } = req.body

        if (!name, !email, !password) {
            const err = new Error("All fields are required")
            err.status = 400
            return next(err)
        }

        if (!validator.isEmail(email)) {

            const err = new Error("Enter Valid Email")
            err.status = 400
            return next(err)
        }

        const user = await userModel.findOne({ email: email })

        if (user) {
            return res.status(200).json({
                message: "User is Already Exists", user: { email: user.email }
            })
        }

        const userData = userModel({
            name: name,
            email: email,
            password: password
        })

        userData.save()

        const token = jwt.sign({ userId: userData._id }, process.env.JWT_SECRET, { expiresIn: "2d" })
        res.cookie("token", token, { httpOnly: true });

        return res.status(200).json({
            message: "User is Register succesfully", userData, token
        })

    } catch (err) {
        next(err)
    }
}


const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body || {}
        // console.log(email,password)

        if (!email, !password) {
            const err = new Error("All Fields are required")
            err.status = 400
            return next(err)
        }

        const user = await userModel.findOne({ email }).select("+password")

        if (!user) {
            const err = new Error("User is Already Exists")
            err.status = 409
            return next(err)
        }



        const isValidPass = await user.comparePassword(password)

        if (!isValidPass) {
            const err = new Error("Password is Invalid")
            err.status = 400
            return next(err)
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "2d" })

        res.cookie("token", token, { httpOnly: true });
        return res.status(200).json({
            message: "User LoggedIn",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
            token
        })


    } catch (err) {
        next(err)
    }

}



const userLogout = async (req, res, next) => {
    try {
        if (req.cookies.token) {
            res.clearCookie("token", {
                httpOnly: true,
            });
        }

        return res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (err) {
        next(err);
    }
};

const getUser = async (req, res, next) => {
    try {
        const user = req.user._id
        return res.status(200).json({
            success: true,
            user: user
        });

    } catch (err) {
        next(err)
    }
}
export { UserRegsiter, userLogin, userLogout, getUser }