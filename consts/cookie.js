const { JWT_COOKIE_EXPIRES_IN } = require('../configs');

const COOKIE_OPTIONS = {
  maxAge: new Date(Date.now() + JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
};

module.exports = { COOKIE_OPTIONS };
