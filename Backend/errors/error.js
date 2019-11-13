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

module.exports = {ValidationError, PermissionError, DatabaseError, HashError, InvalidInputError};
