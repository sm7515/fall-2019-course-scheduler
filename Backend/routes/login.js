var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/login', function(req, res, next) {
  if(req.session.name){
    res.send("already logged in.");
  }
  User.find({name:req.body.name}, (err, user)=>{
    if(user == null){
      res.json({error:"User don't exist. "});
    }
    else if(user.password != req.body.password){
      res.json({error:"Wrong password"});
    }
    req.session.name = user.name;
    res.send("Successfully logged in!");
  })
});

module.exports = router;
