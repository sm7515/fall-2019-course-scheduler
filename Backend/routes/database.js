var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/fetchData', function(req, res, next) {

    //TODO: Fetch data from database  

  res.send('Fetch data');
});

router.post('/addData', function (req, res, next) {
    // console.log(req.body);
    // var jsonObj = JSON.parse(req.body);
    
    res.json(req.body);
  });

module.exports = router;
