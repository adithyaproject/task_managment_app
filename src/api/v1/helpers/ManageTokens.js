//---Third party libraries and modules
const jwt = require("jsonwebtoken");

//---Custom libraries and modules---
const Configs = require("../../../configs");

//---Function to generate acess token
const GenerateTokens = (user)=>{
    try{
        //Create payload
        const payload={id: user._id, userType: user.userType};

        //Generate access token
        const accessToken = jwt.sign(payload, Configs.JWT_ACCESS_KEY,{
            expiresIn: "10m"
        });

        return{status:true, accessToken};

    }catch(err){
        console.log(err);
        return{status:false, accessToken:null};
    }
};

//---Function to verify the acess token---
const VerifyTokens = (token)=>{
    try{
        const user = jwt.verify(token, Configs.JWT_ACCESS_KEY);

        return{status:true, tokenDetails: user};
    }catch(err){
        console.log(err);
        return{status:false, tokenDetails: null};
    }
};

module.exports = {GenerateTokens, VerifyTokens};