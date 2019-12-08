var express = require('express');
var router = express.Router();
const User = require('../schema/user_schema');
const bcrypt = require('bcryptjs');
const {ValidationError, PermissionError, DatabaseError, HashError}
 = require('../errors/error');

/* GET users listing. */
router.post('/', function(req, res, next) {
//  console.log(req.session);
//  res.set('Access-Control-Allow-Origin', req.headers.origin);
  if(req.session.user_id){
    res.status(401).send(new ValidationError("Already logged in."));
  }
  else{
    User.findOne({name:req.body.name}, (err, user)=>{
      if(err){
        res.status(500).send(new DatabaseError("database lookup error"));
      }
      if(!user){
        console.log("user don't exist");
        res.status(401).send(new ValidationError("User don't exist."));
      }
      else{
      //  console.log(user);
        bcrypt.compare(req.body.password, user.password, function(err, result) {
        //  console.log(result);
          if(err){
          //  console.log(err);
            res.status(500).send(new HashError("Internal hash error"));
          }
          if(result === true){
            req.session.user_id = user._id;
            res.send();
          }
          else{
            //  console.log(new ValidationError('Wrong password').message);
              res.status(401).send(new ValidationError('Wrong password'));
          }
        });
      }
    });

  }
});

module.exports = router;
