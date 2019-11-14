const router = require('express').Router();
const User = require('../schema/user_schema');

/**
 * user adds a class to the schedule
 * @name add a class to the current schedule
 * @route {POST} /schedule/add
 * @authentification User needs to be logged in to access the api
 * @bodyparam course_id the id of the course to be added
 */
router.post('/add', function(req, res, next){
  //if user is not logged in, error
  if(!req.session.id){
    res.status(401).send(new Error('You need to log in before you add a class'));
  }
  //logged in, add course
  const course_id = req.body;
  //if there is a conflict, add failed
});

router.get()
