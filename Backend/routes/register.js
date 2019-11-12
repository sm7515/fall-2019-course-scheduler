var express = require('express');
var router = express.Router();
const User = require('../schema/user_schema'); //imports the user model.
const bcrypt = require('bcryptjs');
const {ValidationError, PermissionError, DatabaseError, HashError, InvalidInputError}
 = require('../error/errors');

router.post("/", function (req, res, next) {
  const user = req.body;
  try{
    validation(user,error);
    bcrypt.hash(user.password, 10, function(err, hash) {
      if(err){
        throw new HashError("Hash password error ");
      }
      else{
        user.password = hash;
        const user_doc = new User(user);
        user_doc.save( function(err){
          if(err){
            throw new InvalidInputError("Incompatible fields. Please try again. ");
          }
          else{
            res.send("success");
          }
        });
      }
    });
  }
  catch(error){
    if(error instanceof InvalidInputError){
      res.status(400).send(error);
    }
    else{
      res.status(500).send(error);
    }

  }
});

function validation(user,error){
  //check if user exists
  if(user.password.length < 6){
    throw new SError("Password is not long enough. The min length is 6");
  }
  User.countDocuments({name: user.name}, function(err, count){
    if(err){
      throw new Error("Database reading error.");
    }
    if(count != 0){
      throw new Error("Username exists. Please try again");
    }
  });
}
module.exports = router;
