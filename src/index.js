//-----Third-party libraries and modules-------
const express = require("express");
require("dotenv/config");

//------Custom libraries and moduls--------
const Configs = require("./configs")
const {ConnectDatabase} = require("./api/v1/helpers")
//------Global instances-----
const app = express();
const PORT = Configs.DEV_PORT || 3308

//Base route
app.get("/", (req,res) => {
    res.status(200).json({success: {massage :`Welcome to the server`}})
});


//Error route
app.use((req,res)=>{
    res.status(404).json({error: {massage :`Not found`}})
})

//------Initialize the connection-----
app.listen(PORT, () =>{
    console.log(`server is running at ${PORT}`);
    ConnectDatabase()
    .then(() => console.log("Connected DB"))
    .catch((err) => console.log(err));
});
