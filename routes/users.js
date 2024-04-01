const userSchema =  require("../models/user.js");

let mongoose = require("mongoose");
let User = mongoose.model("User",userSchema);
let bcrypt = require("bcryptjs");

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
        User.findOne({email : email}).then(User => {
            if(User){
                errors.push({msg : "User already exist"});
                res.render("register",{
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            }
            else {
                let newUser = new mongoose.model("newUser",userSchema)({
                    name : name,
                    email : email,
                    password : password
                });
                console.log(newUser);
                //hash password
                bcrypt.genSalt(10,(err,salt) => {
                    bcrypt.hash(newUser.password,salt,(err,hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        //save user
                        newUser.save()
                            .then(user => {
                                res.redirect("/users/login");
                            })
                            .catch(err => console.log(err))
                    })
                })
            }
            }

        )
    }

})

module.exports = router;