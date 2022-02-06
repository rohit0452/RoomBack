const express = require("express");
const Owner = require("../models/ownermodel");
const bcrypt = require("bcrypt")
const router = express.Router();

/*--------->OWNER REGISTRATION<----------*/
router.post("/owner/register",async (req,res)=>{
    const {name , email , phone , password ,cpassword} = req.body ; 
    console.log(req.body);
    if(!name || !email || !phone || !password || !cpassword ){
        res.status(422).json("Required Field CanNot Blank")
    }
    try{
        const checkuser =await Owner.findOne({email : email})
        if(checkuser){
            res.status(422).json({error : "User Already Exist"})
        }else if(password != cpassword){
            res.status(422).json({error : "Password Doesn't Match"}) 
        }else{
            const owner = new Owner({name , email , phone , password ,cpassword});
            owner.password =await bcrypt.hash(password , 12);
            owner.cpassword =await bcrypt.hash(cpassword , 12)
            const ownerregistered = owner.save();
            if(ownerregistered){
                res.status(201).send("Registered Successfully");
            }else{
                res.status(422).json({err : "Registration Failed"});
            }
        }
    }catch(error){
        console.log(error);
    }
})

/*--------->OWNER LOGIN<----------*/
router.post("/owner/login", async (req,res)=>{
    const {email , password} = req.body
    console.log(req.body);
    if(!email || !password){
        res.status(422).json("Required Field Can't  be Blank");
    }
    try {
        const user = await Owner.findOne({email : email})
        console.log(user);
        if(user){
            const isMatch = bcrypt.compare(password , user.password);
            const token =await user.generateAuthToken();
                res.cookie("token" , token , {expires : new Date().now+60000*60 , httpOnly:true});
            if(!isMatch){
                res.status(401).json({err : "Password doesnt Match"})
                console.log("1");
            }else{
                res.status(200).json("Login Success")
                console.log("2");
              
            }
        }else{
            res.status(422).send("Email Couldn't find");
            console.log("3");
        }
    } catch (error) {
        // res.status(422).json(error);
        console.log("4");
        console.log(error);
    }    
})


module.exports = router ;