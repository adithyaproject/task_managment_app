//----Custom Libraries and modules
const{VerifyTokens}= require("../helpers");

//----Middleware function to authenticate the user
const AuthenticateUser = (req,res,next)=>{
    //Token header
    const tokenHeader= req.headers.token;

    try{
        //Validate the token header
        if(tokenHeader){
            const accessToken = tokenHeader.split("Bearer ")[1];
            if(accessToken){
                //Verify access token
                const verifyToken = VerifyTokens(accessToken);
                if(!verifyToken.status){
                    return res.status(401).json({
                        status: false,
                        error: {message: "Invalid access token!"},
                    });
                }

                //Add user to the request
                req.user = verifyToken.tokenDetails;
                return next();
            }
            return res.status(401).json({
                status: false,
                error: {message: "Access token must be properly provided!"},
            });
        }
        return res.status(401).json({
            status: false,
            error: {message: "Token header must be provided!"},
        });
    }catch(err){
        console.log(err)
        return res.status(500).json({
            status: false,
            error: {message: "Failed to authenticate user!"},
        });

    }
};

//---MIdleware function to authorize the user
const AuthorizeUser = (roles)=>{
    return (req,res,next)=>{
        const userRole = req.user.userType;
        try{
            if(roles.includes(userRole)){
                return next();
            }
            return res.status(401).json({
                status: false,
                error:{message:"Permission denide to access this resource"}
            });
        }catch(err){
            console.log(err);
            return res.status(500).json({
                status: false,
                error:{message:"Failed to authorize the user"}
            });    


        }
    };
};
module.exports = {AuthenticateUser, AuthorizeUser};