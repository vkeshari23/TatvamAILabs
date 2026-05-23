import jwt from "jsonwebtoken";

import User from "../models/UserModel.js";
import { comparePassword, hashPassword } from "../utils/utils.js";

export const signup = async (req, res) => {
  try {
    const {name,email,password,cpassword} = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({message: "User Already Exists"})
    }

    if (password !== cpassword) {
      return res.status(400).json({message:"Passwords Do Not Match"});
    }

    const hashedPassword =await hashPassword(password);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    res.status(201).json({message:"Signup Successful",user})
  } catch (error) {
    console.log(error);

    res.status(500).json({message: "Server Error"})
  }
};

export const login = async (req, res) => {
  try {
    const {email,password} = req.body;

    const user =await User.findOne({ email });

    if (!user) {
      return res.status(400).json({message:"Invalid Credentials"});
    }

    const isMatch =await comparePassword( password, user.password)

    if (!isMatch) {
      return res.status(400).json({message: "Invalid Credentials",})
    }

    const token = jwt.sign({ userId: user._id,},process.env.JWT_SECRET,{ expiresIn: "7d"})

    res.status(200).json({message:"Login Successful",token,user})
  } catch (error) {
    console.log(error);

    res.status(500).json({message: "Server Error"});
  }
};

