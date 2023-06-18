
const bcrypt = require("bcrypt");
//---Custom Libaries and modules----
const {UserModel} = require("../models");
const { json } = require("express");
const{GenerateTokens} = require("../helpers/ManageTokens")

//----Controller functions----
//User registration
const RegisterUser = async(req,res) =>{
    //Request body

    const {
        fullName,
        emailAddress,
        password,
        phoneNumber,
        gender,
        userType,
        dateCreated,
        timeCreated,

    } = req.body

    

    try{
            //Check if email or phone number already exist
        const user = await UserModel.findOne({
            $or : [{emailAddress},{phoneNumber}],
        }).exec();
    
        if(user){
            return res.json({
                status: false,
                error:{
                    message: "email or phone number already exist"
                },
            });
        }
    
        //Password hashing
        const hashedPassword = await bcrypt.hash(password, 8);
    
        //new user
        const newUser = new UserModel({
            fullName,
            emailAddress,
            password: hashedPassword,
            phoneNumber,
            gender,
            userType,
            dateCreated,
            timeCreated,
        });
        const saveUser = await newUser.save();
        return res.status(201).json({
            status: true,
            user: saveUser,
            success: { 
                message : "successfully registered"
            },
        });
    } catch (err){
        console.log(err);
        return res.status(500).json({
            status: false,
            error: { 
                message : "Failed to register"
            },
        });
    }
};

const LogingUser = async(req,res)=>{
    //Request body
    const{emailAddress,password}= req.body;

    try{
        //check if email already exist
        const user = await UserModel.findOne({emailAddress}).exec();
        if(!user){
            return res.status(401).json({
                status:false,
                error:{message: "wrong email address"},
            });
        }

        //check if password matches
        const passMatch = await bcrypt.compare(password, user.password);
        if(!passMatch){
            return res.status(401).json({
                status: false,
                error:{message:"Wrong password!"},
            });
        }

        //Generate the acess token
        const{accessToken}= GenerateTokens(user);


        return res.status(200).json({
            status: true,
            accessToken,
            success:{message:"Successfuly Login User"},
        })
    }catch(err){
        console.log(err);
        return res.status(200).json({
            status: false,
            error:{message:"Failed to login the user"},
        });

    }
}

//---Controller function to get user informstion by id---
const GetUserById = async(req,res)=>{
    //Request parameters
    const{userId}= req.params;

    try{
        const user = await UserModel.findOne({_id:userId}).exec();
        if(!user){
            return res.status(404).json({
                status : fales,
                success: {message:"No user exist"},
            });
        }
        return res.status(200).json({
            status : true,
            user,
            success: {message:"Successfuly fetch the user"},
        });

    }catch(err){
        console.log(err);
        return res.status(500).json({
            status : fales,
            success: {message:"Failed to fetch the user"},

        });
    }
}
module.exports = {RegisterUser, LogingUser, GetUserById};