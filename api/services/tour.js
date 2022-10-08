const tourSchema = require('../models/tour');
const APIFeatures = require('../../utils/apiFeature');
class tourService {
  async getAllTours(q) {
    const page = q.page * 1 || 1;
    const limit = q.limit * 1 || 10;
    const total = await tourSchema.countDocuments();

    const features = new APIFeatures(tourSchema.find(), q)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const tours = await features.query;

    return { totalTours: total, currentPage: page, limitPerPage: limit, tours };
  }

  async createTour(tour) {
    const newTour = await tourSchema.create({ ...tour });

    return newTour;
  }

  async getOneTour(id) {
    const tour = await tourSchema.findById(id);

    return tour;
  }

  async updateTour(id, price) {
    const tourToUpdate = await tourSchema.findByIdAndUpdate(id, price, {
      new: true,
      runValidators: true,
    });

    return tourToUpdate;
  }

  async deleteTour(id) {
    await tourSchema.findByIdAndDelete(id);
  }
}

module.exports = new tourService();
