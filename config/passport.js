const LocalStrategy = require("passport-local").Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const userSchema =  require("../models/user.js");
const user = mongoose.model("user",userSchema);

module.exports = (passport) => {
    passport.use(
        new LocalStrategy({usernameField : "email"},(email,password,done) => {
            user.findOne({email : email}).then(user => {
                if(!user){
                    return done(null,false,{message : "User not registered"});

                }

                //Math password
                bcrypt.compare(password,user.password,(err,isMatch) => {
                    if(err){
                        throw err
                    }
                    if(isMatch){
                        return done(null,user)
                    }
                    else{
                        return done(null,false,{message: "password is incorrect"})
                    }
                })
            })
    })
    );

    passport.serializeUser(function(user, cb) {
        process.nextTick(function() {
            return cb(null, user.id);
        });
    });

    passport.deserializeUser(function(user, cb) {
        process.nextTick(function() {
            return cb(null, user);
        });
    });
};
