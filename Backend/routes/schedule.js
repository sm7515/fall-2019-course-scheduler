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
        const courses = user.selected
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
  if(toAdd.time == "Room: TBA"){
    return
  }
  //"TuTh 2:00PM - 3:15PM"
  const addTime = splitTime(toAdd.time)
  let comTime, dateSet
  for(let i = 0 ; i < courses.length; i++){
    if(courses[i].time != "Room: TBA"){
      comTime = splitTime(courses[i].time)
      dateSet = comTime.date.entries()

      for(let date of dateSet){
        if(addTime.date.has(date[0]) && !(addTime.end <= comTime.begin || addTime.begin > comTime.end)){
          return new InvalidInputError('There is a conflict of the time you picked with your current schedule.')
        }
      }
    }
  }
}
function splitTime(time){
  var result = {}
  result.date = new Set([])
  time = time.split(' ');
  result.begin = parseTime(time[1])
  result.end= parseTime(time[3])
  for(let i = 0; i < time[0].length/2;i++){
    result.date.add(time[0].substring(i * 2, i * 2 + 2))
  }
  return result
}
function parseTime(time){
  newTime = time.substring(0,time.length - 2).split(':')
  if(parseInt(time.substring(0,time.length - 2), 10) == 12){
    if(time.substring(time.length - 2, time.length) == 'AM'){
      return parseInt(newTime[1],10)
    }
    else{
      return parseInt(newTime[0],10)*60 + parseInt(newTime[1],10)
    }
  }
  if(time.substring(time.length - 2, time.length) == 'AM'){
    return parseInt(newTime[0],10)*60 + parseInt(newTime[1],10)
  }
  else{
    return parseInt(newTime[0],10)*60 + parseInt(newTime[1],10) + 12 * 60
  }
}

module.exports = router;
