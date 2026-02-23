const express=require("express");
const userModel=require("../models/user.model");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
async function userRegistration(req,res){
    try{
        const {fullName,email,universityName,password}=req.body;
        let existingUser=await userModel.findOne({
            email
        })
        if(existingUser){
            return res.status(400).json({
                message:"User already exists"
            })
        }
        let hashedPassword=await bcrypt.hash(password,10);
        const user=await userModel.create({
            fullName,
            email,
            universityName,
            password:hashedPassword
        });
        const token=jwt.sign({
            id:user._id
        },process.env.JWT_SECRET);
        res.cookie("token",token);
        res.status(201).json({
            message:"user created successfully",
            user
        })
    }catch(err){
        console.error("Registration error",err);
        res.status(500).json({
            message:"registration failed"
        })
    }
}

async function userLogin(req,res){
    try{
        const {email,password}=req.body;
        const user=await userModel.findOne({
            email
        })
        if(!user){
            return res.status(400).json({
                message:"Invalid email or password"
            })
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({
                message:"Invalid email or password"
            })
        }
        const token=jwt.sign({
            id:user._id
        },process.env.JWT_SECRET);
        res.cookie("token",token);
        res.status(201).json({
            message:"user loggedIn successfully",
            user
        })
    }catch(err){
        console.error("loggin failed",err);
        res.status(500).json({
            message:"login failed"
        })
    }
}

async function userLogout(req,res){
    res.clearCookie("token",{
        httponly:true,
        secure:false,
        sameSite:"lax"
    });
    res.status(200).json({
        message:"logged out successfully"
    })
}

module.exports={
    userRegistration,
    userLogin,
    userLogout
}