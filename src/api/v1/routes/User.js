//----Third party libraries & modules--------
const express = require("express");

//---Custom libraries and modules----
const{RegisterUser, LogingUser, GetUserById} = require("../controllers")
const{AuthenticateUser, AuthorizeUser} = require("../middlewares")

//---Initialize the router---
const router = express.Router();

//User registration
router.post("/register" , RegisterUser);

//Login user
router.post("/login", LogingUser)

//get 
router.get("/:userId", AuthenticateUser, AuthorizeUser(["member","manager"]), GetUserById);

module.exports = router;