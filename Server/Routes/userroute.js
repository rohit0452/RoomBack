const express = require("express")
const User = require("../models/usermodels");
const router = express.Router();
const bcrypt = require("bcrypt")


// Register Modules
router.post("/user/register" , async(req,res)=>{
    const  {name , email , phone , password ,cpassword} = req.body; 
    console.log(req.body);

    if(!name || !email || !phone || !password || !cpassword){
        res.status(422).send("Required FIeld can't be blank");
    }
    try {
        const dt =await User.findOne({email: email});
        if(dt){
            res.status(422).send("Email Already Exist ");
        }else if(password!=cpassword){
            res.status(422).send("Password doesnt match");
        }else{
            const user =await new User( {name , email , phone , password ,cpassword});
            user.password =await bcrypt.hash(password ,12)
            user.cpassword =await bcrypt.hash(cpassword ,12)
            const registered = user.save();
            if(registered){
                res.status(201).send("Registerd Successfully");
            }else{
                res.status(422).send("Error in registration");
            }
        }
    } catch (error) {
        console.log(error);
    }
})

// Login Module

router.post("/user/login" , async (req,res)=>{
    const {email , password } = req.body; 
    if(!email || !password){
        res.status(422).send("Required Field cant be blank");
    }
    try {
        const user = await  User.findOne({email : email});
        if(user){
            const ismatch =await bcrypt.compare(password , user.password);
            const token =await user.generateAuthToken();
            res.cookie("token" , token , {expires : new Date().now+60000*60 , httpOnly: true})
            if(!ismatch){
                res.status(422).send("Password doesnt match");
            }else{
                res.status(200).send("Login Succcesss")
            }
        }
    } catch (error) {
        console.log(error);
    }
})
   

module.exports = router ;