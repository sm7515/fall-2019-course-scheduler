var express = require('express');
var router = express.Router();
const User = require('../schema/user_schema'); //imports the user model.

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('In users');
});

router.post('/login', function (req, res, next) {
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

router.post("/register", function (req, res, next) {
  //1. Check if register username, password, and email are valid
  //2. If step 1 is true, post to database

  const name = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  const gender = "";
  const school = "";
  const year = "";
  const dateCreated = Date.parse("11/5/2019");

  // const newUser = new User({})

  //TODO: Fetch from data base and check if valid

  let bool = false;
  let data = {
    username,
    password,
    email
  }

  res.json(data);
});

router.post('/userExists', function (req, res, next) {
  const name = req.body.username;

  User.findOne({ "name": name }, function (err, user) {
    if (err) {
      console.log(err);
    }
    else {
      if (user == null) {
        res.json("User does not exist")
      }
      else {
        res.json("User exists");
      }
    }
  })
});

router.post('/add', function (req, res, next) {
  const name = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const gender = req.body.gender;
  const school = req.body.school;
  const year = req.body.year;
  const dateCreated = Date.parse(req.body.date);;
  const newUser = new User({ name, password, email, gender, school, year, dateCreated });

  // console.log(newUser);

  //Check if new user is valid
  User.findOne({ "name": name }, function (err, user) {
    if (err) {
      console.log(err);
    }

    if (user != null) {
      res.json("User Exists. Cannot register");
    }
    else {
      newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
    }
  })

});

module.exports = router;