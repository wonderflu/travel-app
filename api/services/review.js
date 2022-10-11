const CustomHTTPError = require('../../utils/error');
const ReviewSchema = require('../models/review');
const { REVIEW_NOT_FOUND } = require('../../consts/error');

class ReviewService {
  async getAllReviews() {
    const reviews = await ReviewSchema.find();

    return reviews;
  }

  async createReview(review) {
    const newReview = await ReviewSchema.create({ ...review });

    return newReview;
  }

  async updateReview(id, review) {
    const reviewToUpdate = await ReviewSchema.findByIdAndUpdate(id, review, {
      new: true,
      runValidators: true,
    });

    if (!reviewToUpdate) {
      throw CustomHTTPError.BadRequest(REVIEW_NOT_FOUND);
    }

    return reviewToUpdate;
  }
}

module.exports = new ReviewService();
