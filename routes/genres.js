const express = require('express');
const mongoose = require('mongoose');
const auth = require('../middlewares/auth')
const router = express.Router();
const {Genre, validate} = require('../models/genre');

router.get('/',auth, async (req, res) => {

    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.post('/',auth, async (req, res) => {
    const error = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let genre = new Genre({ name: req.body.name });
    const newGenre = await genre.save();
    
    res.send(newGenre);
});

router.put('/:id',auth,async (req, res) => {
     
    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true});
    
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    res.send(genre);
});


router.delete('/:id',auth, async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
  
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
    res.send(genre);
  });
  
  router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);
  
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
    res.send(genre);
  });
  
  module.exports = router;