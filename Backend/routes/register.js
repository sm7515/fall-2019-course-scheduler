var express = require('express');
var router = express.Router();
const User = require('../schema/user_schema'); //imports the user model.


router.post("/", function (req, res, next) {
  var error = [];
  const user = req.body;
  validation(user,error);
  if(error.length === 0){
    const user_doc = new User(user);
    user_doc.save( function(err){
      if(err){
        error.push("Field missing. Registration failed.");
      }
      res.json(error);
    } );
  }
  else{
    res.json(error);
  }
});

function validation(user,error){
  //check if user exists
  if(user.password.length < 6){
    error.push("Password is not long enough. The min length is 6");
  }
  User.countDocuments({name: user.name}, function(err, count){

    if(err){
      console.log(err);
    }
    if(count != 0){
      error.push("Username exists. Please use another one.");
    }
  });
}
module.exports = router;
