const Joi = require('@hapi/joi');
const moongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const userSchema = new moongoose.Schema({

    name:{
        type:String,
        required:true,
        minlength:2,maxlength:30
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        minlength:8,
        maxlength:1024,
        required:true
    }

});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ id:this._id }, process.env.jwtPrivateKey);
    return token;
}

const User = moongoose.model('User', userSchema);

function ValidateUser(user){

    const schema = Joi.object({
       name:Joi.string().min(2).max(30).required(),
       email:Joi.string().required(),
       password:Joi.string().min(5).max(255).required()
    })
 
     const { error, value } = schema.validate(user);
     // if user is validated then error will be undefined

     return error;
 }
 exports.User = User;
 exports.validate = ValidateUser;
