class ValidationError extends Error{
  constructor(message=''){
    super(message);
  }
}

class PermissionError extends Error{
  constructor(message = ''){
    super(message);
  }
}
class DatabaseError extends Error{
  constructor(message = ''){
    super(message);
  }
}
class HashError extends Error{
  constructor(message = ''){
    super(message);
  }
}
class InvalidInputError extends Error{
  constructor(message = ''){
    super(message);
  }
}

<<<<<<< HEAD
module.exports = {ValidationError, PermissionError, DatabaseError, HashError,InvalidInputError};
=======
module.exports = {ValidationError, PermissionError, DatabaseError, HashError, InvalidInputError};
>>>>>>> 76fc35a71acd49183082658c7776d3a99d996143
