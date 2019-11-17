var express = require('express');
var router = express.Router();
const User = require('../schema/user_schema'); //imports the user model.
const bcrypt = require('bcryptjs');
const {ValidationError, PermissionError, DatabaseError, HashError, InvalidInputError}
 = require('../errors/error');

router.post("/", function (req, res, next) {
  const user = req.body;
  let err = validation(user);
    if(err){
      res.status(err.status).send(err);
    }
    bcrypt.hash(user.password, 10, function(err, hash) {
      if(err){
        res.status(500).send(new HashError("Hash password error "));
      }
      else{
        user.password = hash;
        const user_doc = new User(user);
        user_doc.save( function(err){
          if(err){
            res.status(401).send(new InvalidInputError("Incompatible fields. Please try again. "));
          }
          else{
              res.send("success");
          }
        });
      }
    });
  });

function validation(user){
  //check if user exists
  if(user.password.length < 6){
    return new InvalidInputError("Password is not long enough. The min length is 6");
  }
  User.countDocuments({name: user.name}, function(err, count){
    if(err){
      return new DatabaseError("Database reading error.");
    }
    if(count != 0){
      return new InvalidInputError("Username exists. Please try again");
    }
  });
}
module.exports = router;
