const express        = require('express');
const bodyParser     = require('body-parser');

const mongoose       = require('mongoose');
const routes         = require('./app/routes/routes');

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/headInTheStars")

let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, api_key, Authorization');
  next();
}); 

app.use(express.static('public'))

app.use('/', routes);

app.listen(3000, () => console.log("Server started, listening on 3000"));

module.exports = app;