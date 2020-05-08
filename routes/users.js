const {User, validate} = require('../models/user'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const auth = require('../middlewares/auth');

router.get('/me', auth,async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    console.log(user);
    res.status(200).send(user);
})

router.post('/', async (req, res) => {
  
    const error  = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    // checking if any user is already registered with that email
    let user = await User.findOne({ email:req.body.email });
    if(user)  return res.status(400).send('This email is not available for registration');

    user = new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt);
    await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token',token).send(user);
});

module.exports = router;