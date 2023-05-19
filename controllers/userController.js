const User = require('../models/userModel');
//secret key name has to match .env file 
const secret = process.env.SECRET_KEY;
const jwt= require('jsonwebtoken');
const bcrypt = require ('bcrypt');

module.exports = {
    registerUser: async(req,res)=>{
        try{
            const potentialUser= await User.findOne({email:req.body.email})
            if(potentialUser){
                res.staus(400).json({message:'Email Already Exsit'})
            }
            else{
                const newUser = await User.create(req.body);
                //storing new user
                const userToken = jwt.sign({_id:newUser._id,email:newUser},secret,{expiresIn:'24h'})
                
                res.status(201).cookie('userToken',userToken,{httpOnly:true,maxAge:2*60*60*1000}).json(newUser);
            }
        }
        catch(err){

        }
    },
    loginUser: async (req,res)=>{
        try{
            const exsitUser= await User. findOne({email: req.body.email})
            if(exsitUser){
                //check to see if cred matches, its a boolean
                const passwordMatch = await bcrypt.compare(req.body.password,exsitUser.password)
                if(passwordMatch){
                    //log user in/ generate token
                    const userToken = jwt.sign({_id:exsitUser._id,email:exsitUser},secret,{expiresIn:'24h'})
                    res.status(201).cookie('userToken',userToken,{httpOnly:true,maxAge:2*60*60*1000}).json(exsitUser);
                }
                else{
                    //what if password does not match?
                    res.status(400).json({message: 'Invalid email/password'})
                }
            }
            else{
                res.status(400).json({message: 'Invalid email/password'})
            }
        }
        catch(err){
            res.status(400).json({error:err})
        }
    },
    logOut: (req,res)=>{
        res.clearCookie('userToken').json({message: 'Loged out'})
    },
    findAllUsers: (req,res)=>{
        User.find()
            .then((allUsers)=>{
                res.status(200).json(allUsers)
            })
            .catch((err)=>{
                res.status(400).json(err)
            })
    },
    createUser:(req,res)=>{
        User.create(req.body)
            .then((newUser)=>{
                res.status(200).json(newUser)
            })
            .catch((err)=>{
                res.status(400).json(err)
            })
    },
    findOneUser: (req,res)=>{
        User.findOne({_id:req.params.id})
            .then((oneUser)=>{
                res.status(200).json(oneUser)
            })
            .catch((err)=>{
                res.status(400).json(err)
            })
    },
    updateUser: (req,res)=>{
        User.findOneAndUpdate({_id:req.params.id},req,body,{new:true,runValidators:true})
            .then((uodateUser)=>{
                res.status(200).json(updateUser)
            })
            .catch((err)=>{
                res.status(400).json(err)
            })
    },
    deleteUser:(req,res)=>{
        User.deleteOne({_id:req.params.id})
            .then((result)=>{
                res.status(200).json(result)
            })
            .catch((err)=>{
                res.status(400).json(err)
            })
    }

};