
const bcrypt = require("bcrypt");
//---Custom Libaries and modules----
const {UserModel} = require("../models");

//----Controller functions----
//User registration
const UserRegister = async(req,res) =>{
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

    try{
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

module.exports = {UserRegister};