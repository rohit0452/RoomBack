const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const OwnerSchema = new mongoose.Schema({
name : {
    type : String , 
    required : true
} , 
email : {
    type : String ,
    required : true
},
phone :{
    type : Number ,
    required : true  
},

password : {
    type : String , 
    required : true
},
cpassword : {
    type : String , 
    required : true
},
joined : {
    type  : Date , 
    default : Date.now()
},
tokens : [{
    token : {
        type : String , 
        required : true
    }
}]
})

// GENERATING TOKEN HERE

OwnerSchema.methods.generateAuthToken = async function(){
    const token = jwt.sign({_id : this._id},process.env.SECRET);
    this.tokens = this.tokens.concat({token : token});
    await this.save();
    return token ; 
}

const Owner = mongoose.model("Owner" , OwnerSchema)
module.exports = Owner ; 