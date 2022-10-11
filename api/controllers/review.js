const ReviewService = require('../services/review');

class ReviewController {
  async getAllReviews(req, res) {
    const reviews = await ReviewService.getAllReviews();

    res.json({ reviews });
  }

  async createReview(req, res) {
    // allow nested toures
    if (!req.body.tour) {
      req.body.tour = req.params.id;
    }

    if (!req.body.user) {
      req.body.user = req.user.id;
    }

    const review = req.body;

    const newReview = await ReviewService.createReview(review);

    res.status(201).json({ newReview });
  }

  async updateReview(req, res) {
    const { id } = req.params.id;
    const { review } = req.body;

    const reviewToUpdate = await ReviewService.updateReview(id, review);

    res.json({ reviewToUpdate });
  }
}

module.exports = new ReviewController();
