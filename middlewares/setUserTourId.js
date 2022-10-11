const UserAndTourIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) {
    req.body.tour = req.params.id;
  }

  if (!req.body.user) {
    req.body.user = req.user.id;
  }

  next();
};

module.exports = { UserAndTourIds };
