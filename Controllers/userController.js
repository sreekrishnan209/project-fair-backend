// Define logic functions 


const users = require("../Models/userSchema");

const jwt = require('jsonwebtoken')
// Register logic function
exports.register=async(req,res)=>{
    console.log("Inside register function");
    try{
        const {username,email,password} = req.body
        console.log(`${username} ${email} ${password}`);
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(404).json("User already exists")
        }
        else{
            const newUser = new users({
                username,email,password,github:"",link:"",profile:""
            })
            await newUser.save()  // data saved in mongodb
            res.status(200).json("User created successfully")
        }

    }
    catch(err){
        res.status(500).json("Server error"+err.message)
    }
}


// Login logic function
exports.login = async(req,res)=>{
//    console.log("Inside login function");
    const {email,password}=req.body
 //   console.log(`${email} ${password}`);
    try{
        const user = await users.findOne({email,password})
        if(user){
            const token = jwt.sign({userId:user._id},"superkey2024")
            console.log(token);
            res.status(200).json({user,token}) // login success
        }
        else{
         res.status(404).json("Invalid user")   
        }
    }
    catch(err){
        res.status(500).json("server error"+ err.message)
    }
}