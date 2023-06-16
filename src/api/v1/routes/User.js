//----Third party libraries & modules--------
const express = require("express");

//---Custom libraries and modules----
const{UserRegister} = require("../controllers")

//---Initialize the router---
const router = express.Router();

//User registration
router.post("/register" , UserRegister);

module.exports = router;