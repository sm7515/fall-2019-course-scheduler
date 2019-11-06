var express = require('express');
var router = express.Router();
const User = require('../schema/user_schema'); //imports the user model.


router.post("/", function (req, res, next) {
  //1. Check if register username, password, and email are valid
  //2. If step 1 is true, post to database
  const user = req.body;
  var error = [];
  validation(user);
  if(error.length === 0){
    const user_doc = new User(user);
    user_doc.save( function(err){
      if(err){
        error.push("Failed to save to database. ");
      }
      res.json({error});
    } );
  };
});

function validation(user){
  //check if user exists
  User.countDocuments({name: user.name}, function(err, count){
    if(err){
      console.log(err);
    }
    if(count != 0){
      error.push("Username exists. Please use another one.");
    }
  });
  //check if the password has at least 6 digits
  if(user.password.length < 6){
    error.push("Password is not long enough. The min length is 6");
  }
}
module.exports = router;
