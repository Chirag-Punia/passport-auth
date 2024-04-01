const mongoose = require('mongoose');

const db = require("./config/keys").MongoURI;


const express = require('express');

const app = express();


const expressLayouts = require("express-ejs-layouts");


const PORT = process.env.PORT || 5000;


app.use(express.urlencoded({extended : false}))


app.use(expressLayouts);


//connect to MongoDB
mongoose.connect(db).then(() =>{
    console.log("MongoDB connected")
}).catch(err => console.log(err));


//routes

app.set("view engine", "ejs");

app.use('/' , require("./routes/index"));

app.use('/users' , require("./routes/users"));


app.listen(PORT,() => {
    console.log(`App started at PORT ${PORT}`)
});

