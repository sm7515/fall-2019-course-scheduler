var express = require('express');
var router = express.Router();
const User = require('../schema/user_schema');
const bcrypt = require('bcryptjs');
const {ValidationError, PermissionError, DatabaseError, HashError}
 = require('../error/errors');

/* GET users listing. */
router.post('/', function(req, res, next) {
  if(req.session.id){
    res.send("already logged in.");
  }
  try{
    User.find({name:req.body.name}, (err, user)=>{
      if(err){
        throw new DatabaseError("database lookup error");
      }
      if(!user){
        throw new ValidationError("User don't exist.");
      }
      else{
        bcrypt.compare(req.body.password, user.password, function(err, res) {
          if(err){
            throw new HashError("Internal hash error");
          }
          if(res === true){
            req.session.id = user._id;
            res.send();
          }else{
              throw new ValidationError('Wrong password');
          }
        });
      }
    });
  }
  catch(error){
    if(error instanceof ValidationError){
      res.status(401).send(error);
    }
    else{
      res.status(500).send(error);
    }
  }


});

module.exports = router;
