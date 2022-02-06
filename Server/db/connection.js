const mongoose = require("mongoose");

const db = process.env.DATABASE;

mongoose.connect(db,
    {
        useUnifiedTopology : true ,
        useNewUrlParser: true})
    .then(console.log("Database Connetcted Successfully"))
    .catch(()=>console.log("Database Not Connected"));