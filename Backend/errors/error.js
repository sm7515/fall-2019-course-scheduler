class ValidationError{
  constructor(message){
    this.status = 401;
    this.message = message;
  }
}

class PermissionError{
  constructor(message){
    this.status = 402;
    this.message = message;
  }
}
class DatabaseError{
  constructor(message){
    this.status = 500;
    this.message = message;
  }
}
class HashError{
  constructor(message){
    this.status = 500;
    this.message = message;
  }
}
class InvalidInputError{
  constructor(message){
    this.status = 403;
    this.message = message;
  }
}

module.exports = {ValidationError, PermissionError, DatabaseError, HashError, InvalidInputError};
