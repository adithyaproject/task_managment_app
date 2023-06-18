
const bcrypt = require("bcrypt");
//---Custom Libaries and modules----
const {UserModel} = require("../models");
const { json } = require("express");

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

        return res.status(200).json({
            status: true,
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
module.exports = {RegisterUser, LogingUser};