const CustomHTTPError = require('../../utils/error');
const ReviewSchema = require('../models/review');
const { REVIEW_NOT_FOUND } = require('../../consts/error');

class ReviewService {
  async getAllReviews(filter) {
    const reviews = await ReviewSchema.find(filter);

    return reviews;
  }

  async createReview(review) {
    const newReview = await ReviewSchema.create({ ...review });

    return newReview;
  }

  async updateReview(id, review) {
    const updatedReview = await ReviewSchema.findByIdAndUpdate(
      id,
      { review },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedReview) {
      throw CustomHTTPError.BadRequest(REVIEW_NOT_FOUND);
    }

    return updatedReview;
  }
}

module.exports = new ReviewService();
