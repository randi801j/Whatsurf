const User = require('../models/userModel');

module.exports = {
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