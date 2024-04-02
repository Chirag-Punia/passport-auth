const userSchema =  require("../models/user.js");
const mongoose = require("mongoose");
const user = mongoose.model("user",userSchema);
const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/login", (req,res) => {
    res.render("login");
});
router.get("/register", (req,res) => {
    res.render("register");
});
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
        user.findOne({email : email}).then(user => {
            if(user){
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
                let newUser = new mongoose.model("user",userSchema)({
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

});

//login handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

// Logout
router.get('/logout', (req, res,next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/users/login');
    });
});

module.exports = router;