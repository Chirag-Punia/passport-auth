const express = require("express");

const router = express.Router();

router.get("/login", (req,res) => {
    res.render("login");
})

router.get("/register", (req,res) => {
    res.render("register");
})

router.post("/register",(req,res) =>{
    let {name,email,password,password2} = req.body;
    let errors = [];
    if(!name || !email || !password || !password2){
        errors.push({msg : "Enter all required field"})
    }
    if(password !== password2){
        errors.push({msg : "Password did not match"})
    }
    if(password.length < 6){
        errors.push({msg : "Password should be at least 6 characters"})
    }
    if (errors.length > 0){
        res.render("register",{
            errors,
            name,
            email,
            password,
            password2
        })
    }
    else {
        res.send("Pass");
    }

})

module.exports = router;