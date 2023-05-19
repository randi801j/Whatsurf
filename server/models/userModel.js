const mongoose = require ('mongoose');
const bcrypt = require ('bcrypt');
const {isEmail}= require('validator');

const userSchema = new mongoose.Schema({
    userName: {
        type: String, 
        required: [true, 'UserName is Required']
    },
    userLast:{
        type: String, 
        required: [true, 'UserName is Required']
    },
    email: {
        type: String, 
        required: [true,'Email is Required'],
        validate:[isEmail,'Invalid Email'],
    },
    password:{
        type: String,
        required: [true,'Password Requried'],
        minlength: [6,'Password must be min 6 characters']
    }
},{timestamps: true})


//middleware virtual field wont add to data base
userSchema.virtual('Confirm Password')
    .get(()=>this.confirmPassword)
    .set(value=>this.confirmPassword= value);

// previouse before adding to database
userSchema.pre('valdate',function(next){
    if(this.password !=this.confirmPassword){
        this.invalidate('confirmPassword', 'Password do not Match')
    }
    next();
})

//salt it 10 times
userSchema.pre ('save',function(next){
    bcrypt.hash(this.password,10)
        .then(hash =>{
            this.password = hash;
            next();
        });
});

//const User = mongoose.model("User",userSchema);

module.exports= mongoose.model('User',userSchema);