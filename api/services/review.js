const CustomHTTPError = require('../../utils/error');
const ReviewSchema = require('../models/review');
const { REVIEW_NOT_FOUND } = require('../../consts/error');

class ReviewService {
  async getAllReviews(filter) {
    const reviews = await ReviewSchema.find(filter);

    return reviews;
  }

  async getOneReview(id) {
    const review = await ReviewSchema.findById(id);

    if (!review) {
      throw CustomHTTPError.BadRequest(REVIEW_NOT_FOUND);
    }

    return review;
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

  async deleteReview(id) {
    const deletedReview = await ReviewSchema.findByIdAndDelete(id);

    if (!deletedReview) {
      throw CustomHTTPError.BadRequest(REVIEW_NOT_FOUND);
    }
  }
}

module.exports = new ReviewService();
