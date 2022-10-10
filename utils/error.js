class CustomHTTPError extends Error {
  status;
  constructor(status, message) {
    super(message);
    this.status = status;
  }

  static BadRequest(message) {
    return new CustomHTTPError(400, message);
  }

  static Unauthorized() {
    return new CustomHTTPError(
      401,
      'The requested resource requires user authorization.'
    );
  }

  static Forbidden() {
    return new CustomHTTPError(
      403,
      'You do not have permission to access this resource.'
    );
  }

  static NotFound() {
    return new CustomHTTPError(
      404,
      'The page you are looking for was not found.'
    );
  }
}

module.exports = CustomHTTPError;
