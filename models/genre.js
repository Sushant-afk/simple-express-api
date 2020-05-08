const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
});

const Genre = mongoose.model('Genre', genreSchema);

    function validateGenre(genre) {
      const schema = Joi.object({
        name:Joi.string().min(5).max(50).required(),
     })
     const { error, value } = schema.validate(genre);

     return error;
}
  
exports.genreSchema = genreSchema;
exports.Genre = Genre; 
exports.validate = validateGenre;