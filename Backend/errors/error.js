class ValidationError extends Error{
  constructor(message){
    super(message);
    this.status = 401;
    this.message = message;
  }
}

class PermissionError extends Error{
  constructor(message){
    super(message);
    this.status = 401;
    this.message = message;
  }
}
class DatabaseError extends Error{
  constructor(message){
    super(message);
    this.status = 500;
    this.message = message;
  }
}
class HashError extends Error{
  constructor(message){
    super(message);
    this.status = 500;
    this.message = message;
  }
}
class InvalidInputError extends Error{
  constructor(message){
    super(message);
    this.status = 401;
    this.message = message;
  }
}

module.exports = {ValidationError, PermissionError, DatabaseError, HashError, InvalidInputError};
