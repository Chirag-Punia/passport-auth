const express = require('express');

const app = express();

const expressLayouts = require("express-ejs-layouts");

const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;

const db = require("./config/keys").MongoURI;

//connect to Mongo
mongoose.connect(db).then(() =>{
    console.log("MongoDB connected")
}).catch(err => console.log(err));



//routes

app.use(expressLayouts);
app.set("view engine", "ejs");

app.use('/' , require("./routes/index"));

app.use('/users' , require("./routes/users"));


app.listen(PORT,() => {
    console.log(`App started at PORT ${PORT}`)
});

