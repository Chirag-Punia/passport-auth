const express = require('express');

const app = express();

const expressLayouts = require("express-ejs-layouts");

const PORT = process.env.PORT || 5000;

//routes

app.use(expressLayouts);
app.set("view engine", "ejs");

app.use('/' , require("./routes/index"));

app.use('/users' , require("./routes/users"));


app.listen(PORT,() => {
    console.log(`App started at PORT ${PORT}`)
});

