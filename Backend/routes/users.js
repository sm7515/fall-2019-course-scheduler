var express = require('express');
var router = express.Router();
const User = require('../schema/User.class'); //imports the user model.

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('In users');
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
