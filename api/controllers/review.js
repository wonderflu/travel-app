const ReviewService = require('../services/review');

class ReviewController {
  async getAllReviews(req, res) {
    let filter = {};

    if (req.params.id) {
      filter = { tour: req.params.id };
    }
    const reviews = await ReviewService.getAllReviews(filter);

    res.json({ reviews });
  }

  async getOneReview(req, res) {
    const { id } = req.params;

    const review = await ReviewService.getOneReview(id);

    res.json({ review });
  }

  async createReview(req, res) {
    const review = req.body;

    const newReview = await ReviewService.createReview(review);

    res.status(201).json({ newReview });
  }

  async updateReview(req, res) {
    const { id } = req.params;
    const { review } = req.body;

    const updatedReview = await ReviewService.updateReview(id, review);

    res.json({ updatedReview });
  }

  async deleteReview(req, res) {
    const { id } = req.params;

    await ReviewService.deleteReview(id);

    res.status(204).json();
  }
}

module.exports = new ReviewController();
