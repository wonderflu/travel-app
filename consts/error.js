const errors = {
  TOUR_NOT_FOUND: 'Tour with the specified ID is not found',
  USER_NOT_FOUND: 'User with the specified ID or email is not found',
  REVIEW_NOT_FOUND: 'Review with the specified ID is not found',
  NO_CREDENTIALS:
    'Please provide email or password, those fields cannot be empty',
  INCORRECT_CREDENTIALS: 'Email or password is incorrect',
  NO_EMAIL: 'Please provide email',
  TEMPLATE_NOT_FOUND: 'The requested template was not found',
  EMAIL_NOT_SENT:
    'Something went wrong, an email was not sent, please try again later',
  INVALID_TOKEN: 'Token is invalid or had expired',
  WRONG_PASSWORD: 'Password you entered is incorrect',
  CANNOT_UPDATE: 'Cannot update this field',
  TOO_MANY_REQUESTS:
    'Too many requests from this IP, please try again in an hour',
  LAT_LNG_FORMAT:
    'Wrong format, please provide latitude and longtitude in the following format: lat, lng',
};

module.exports = errors;
