const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const user = require('./routes/users');
const auth = require('./routes/auth');
const express = require('express');
const dotenv = require('dotenv').config();
const app = express();

if(!process.env.jwtPrivateKey)
{
  console.log('FATAL ERROR jwtPrivateKey not defined!')
}

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/url";

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users',user);
app.use('/api/auth',auth);

const port = process.env.PORT || 3900;
app.listen(port, () => console.log(`Listening on port ${port}...`));