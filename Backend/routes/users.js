var express = require('express');
var router = express.Router();
const User = require('../schema/user_schema'); //imports the user model.

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('In users');
});

router.post('/login', function(req,res,next){
  //Check login info and respond if it's valid in database
  const username = req.body.username;
  const password = req.body.password;

  //Pass data to database, if found return true, else return false
  let bool = false;
  let data = {
    username,
    password
  }

  res.json(data);
});

router.post("/register", function(req,res,next){
  //1. Check if register username, password, and email are valid
  //2. If step 1 is true, post to database

  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  //TODO: Fetch from data base and check if valid

  let bool = false;
  let data = {
    username,
    password,
    email
  }

  res.json(data);
});

router.post('/add', function (req, res, next) {
  const username = req.body.username;
  const school = req.body.school;
  const year = Number(req.body.year);
  const date = Date.parse(req.body.date);;
  const newUser = new User({ username,school,year,date });

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;
