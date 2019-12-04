const router = require('express').Router();
const User = require('../schema/user_schema');
const Course = require('../schema/course_schema')
const {ValidationError, PermissionError, DatabaseError, HashError, InvalidInputError}
 = require('../errors/error');
/**
 * user adds a class to the schedule
 * @name add a class to the current schedule
 */
router.post('/add', function(req, res, next){
  //if user is not logged in, error
  let error
  if(!req.session.user_id){
    error = new PermissionError('You need to log in before you add a class')
    res.status(error.status).send(error);
  }
  else{
    var add_id = req.body.course_id;
    User.findById(req.session.user_id).populate('selected').exec(function(err, user){
      if(err){
        error = new DatabaseError('User lookup failed')
        res.status(error.status).send(error)
      }
      else{
        //get all the courses the user currently have
        courses = user.selected
        //get course to be added
        Course.findById(add_id, function(err, toAdd){
          if(err){
            error = new DatabaseError('class lookup failed')
            res.status(error.status).send(error);
          }
          else{
            error = canBeAdd(courses, toAdd)
            //if current course can be added
            if(!error){
              User.findByIdAndUpdate(req.session.user_id, {"$push":{"selected":add_id }}, function(err, data){
                if(err){
                  error = new DatabaseError('failed to update the user schedule list');
                  res.status(error.status).send(error);
                }
                else{
                  res.status(200).send('successfully updated')
                }
              })
            }
            else{//if the course can't be added to the user schedule
              res.status(error.status).send(error)
            }
          }

        })


      }

    })


  }
    //if there is a conflict, add failed
});

//get all courses a user has picked
router.get('/viewSchedule', function(req,res,next){
  let error
  if(!req.session.user_id){
    error = new PermissionError('You need to log in before you add a class')
    res.status(error.status).send(error)
  }
  else{
    User.findById(req.session.user_id).populate('selected').exec(function(err, user){
      if(err){
        error = new DatabaseError('User lookup failed')
        res.status(error.status).send(error)
      }
      else{
        res.json(user.selected)
      }
    })
  }
})

//check if a course can be added to the course list
function canBeAdd(courses, toAdd){

}
module.exports = router;
