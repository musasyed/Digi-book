const express=require("express");
const User = require("../models/User");
const router=express.Router();
const { body,validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWt_Secret="MYNAMEISMUSA";
const fetchuser=require("../middleware/fetchuser")



// Route01: Create User
router.post("/createuser",[
body('name',"Enter a valid Name").isLength({min:3}),
body('email',"Enter a valid Email").isEmail(),
body('password',"Password must be atLeast 05 characters").isLength({min:5})

],async(req,res)=>{
  let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()});
    }
try{

    // Check whether use with that email exist or not
    let user=await User.findOne({email:req.body.email})
    if(user){
        return res.status(400).json({success,error:"User with this email already exists"})
    }

    // We use salt it create hash every time which give us more security
    const salt=await bcrypt.genSalt(10);
    const secPassword=await bcrypt.hash(req.body.password,salt);
    // Create a new user
    user=await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
      }) 
      const data={
        user:{
            id:user.id
        }
      }

    //   JWT Token takes data which we give id and secret key 
      const JSOTOKEN=jwt.sign(data,JWt_Secret);
      success=true;
      res.send({success,JSOTOKEN})
    //   res.json(user)
    }catch(error){
        console.error(error.message)
        res.send("Error Occured")
    }
      /*
    //   .then(user => res.json(user)).catch(error=>{console.log(error)
    // res.json({error:"Please enter unique value for email"})
    // })   */

    })



    // Route02: Login Rout
router.post('/loginUser',[
body('email',"Enter a valid email").isEmail(),
body('password',"Password cannot be blank").exists(),
],async(req,res)=>{
  let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()});
    }
    const {email,password}=req.body;
    try {
        let user=await User.findOne({email})
        if(!user){
            return res.status(400).json({error:"Try to login with correct credentials"})
        }
        const passwordCompare=await bcrypt.compare(password,user.password)
        if(!passwordCompare){
            success=false
            return res.status(400).json({success,error:"Try to login with correct credentials"})
        }
        const data={
            user:{
                id:user.id
            }
          }
    
        //   JWT Token takes data which we give id and secret key 
          const JSOTOKEN=jwt.sign(data,JWt_Secret);
          success=true;
          res.json({success,JSOTOKEN})
    } 
    catch(error){
        console.error(error.message)
        res.send("Internal Error Occured")
    }



    
})



// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser,  async (req, res) => {

  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})
    module.exports=router;