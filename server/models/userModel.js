const mongoose = require ('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String, 
        required: [true, 'UserName is Required']
    },
    email: {
        type: String, 
        required: [true,'Email is Required'],
        unique: true
    },
    password:{
        type: String,
        required: [true,'Password Requried'],
        minlength: [6,'Password must be min 6 characters']
    }
},{timestamps: true})

const User = mongoose.model("User",userSchema);

module.exports=User;