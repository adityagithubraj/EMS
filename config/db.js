//first require mongoose and dotenv 
const mongoose= require("mongoose");
require("dotenv").config();

//then conect to db
const connection =mongoose.connect(process.env.URL);

//EXPORT MODULE HER
module.exports=connection





