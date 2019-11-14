const router = require('express').Router();
const User = require('../schema/user_schema');
const {ValidationError, PermissionError, DatabaseError, HashError, InvalidInputError}
 = require('../errors/error');

/**
 * @name get /schedule/add
 * @bodyparam course_id the id of the course to be added
 * @authentification user needs to be logged in
 * @resError 401 if user is not logged in
 * @resError 403 if specific class has conflict
 * @resError 500 if server has internal error
 *
*/
router.post('/add', function(req, res, next){
  //if user is not logged in, error
  if(!req.session.id){
    res.status(401).send(new ValidationError('You need to log in before you add a class'));
  }
  //logged in, add course
  const course_id = req.body;
  //if there is a conflict, add failed
});


//check if a class is valid
function isValid(user_id, course_id){

}
module.exports = router;
