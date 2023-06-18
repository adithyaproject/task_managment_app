//----Third party libraries & modules--------
const express = require("express");

//---Custom libraries and modules----
const{RegisterUser, LogingUser} = require("../controllers")

//---Initialize the router---
const router = express.Router();

//User registration
router.post("/register" , RegisterUser);

//Login user
router.post("/login", LogingUser)

module.exports = router;