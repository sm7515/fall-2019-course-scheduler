var express = require('express');
var router = express.Router();
const User = require('../schema/user_schema');

/* GET users listing. */
router.post('/', function(req, res, next) {
  if(req.session.id){
    res.send();
  }
  User.find({name:req.body.name}, (err, user)=>{
    if(err){
      console.log(err);
    }
    if(!user){
      console.log("flag");
      res.json(["User don't exist. "]);
    }
    else if (user.password !== req.body.password) {
      res.json(["Wrong password"]);
    } else {
      req.session.name = user.name;
      res.send();
    }

  })
});

module.exports = router;
