var express = require('express');
var router = express.Router();
const User = require('../schema/user_schema');
const bcrypt = require('bcryptjs');
const {ValidationError, PermissionError, DatabaseError, HashError}
 = require('../errors/error');

/* GET users listing. */
router.post('/', function(req, res, next) {
  if(req.session.id){
    console.log(req.session.id);
    res.send("already logged in.");
  }
  else{
    User.find({name:req.body.name}, (err, user)=>{
      if(err){
        res.status(500).send(new DatabaseError("database lookup error"));
      }
      if(!user){
        res.status(401).send(new ValidationError("User don't exist."));
      }
      else{
        bcrypt.compare(req.body.password, user.password, function(err, result) {
          if(err){
            console.log(err);
            res.status(500).send(new HashError("Internal hash error"));
          }
          if(result === true){
            req.session.id = user._id;
            res.send();
          }
          else{
                res.status(401).send(new ValidationError('Wrong password'));
          }
        });
      }
    });

  }
});

module.exports = router;
