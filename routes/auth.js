const Joi = require('@hapi/joi');
const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const bcrypt = require('bcrypt');

router.post( '/', async (req, res) => {

    const error  = validate(req.body); 
    if (!error) return res.status(400).send(error);

    let user = await User.findOne({ email:req.body.email });
    if(!user)  return res.status(400).send('Invalid email email or password!');

    const validPassword = await bcrypt.compare(req.body.password,user.password);
    if(!validPassword) return res.status(400).send('Invalid email email or password!');

    const token = user.generateAuthToken();
    res.set('Content-Type', 'text/plain');
    res.send(token);
    
})


function validate(req)
{
    const schema = Joi.object({
        email:Joi.string().required(),
        password:Joi.string().min(5).max(255).required()
     })
  
      const { error, value } = schema.validate(req);
      // if user is validated then error will be undefined
 
      if(error) console.log('schema validation failed');
      else console.log('schema validated');
}

module.exports = router;