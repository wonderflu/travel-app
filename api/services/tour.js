const tourSchema = require('../models/tour');
const APIFeatures = require('../../utils/apiFeature');
const CustomHTTPError = require('../../utils/error');
const { TOUR_ALREADY_EXISTS, TOUR_NOT_FOUND } = require('../../consts/error');
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
    const duplicate = await tourSchema.findOne({ name: tour.name });

    if (duplicate) {
      throw CustomHTTPError.BadRequest(TOUR_ALREADY_EXISTS);
    }

    const newTour = await tourSchema.create({ ...tour });

    return newTour;
  }

  async getOneTour(id) {
    const tour = await tourSchema.findById(id);

    if (!tour) {
      throw CustomHTTPError.BadRequest(TOUR_NOT_FOUND);
    }

    return tour;
  }

  async updateTour(id, price) {
    const tourToUpdate = await tourSchema.findByIdAndUpdate(id, price, {
      new: true,
      runValidators: true,
    });

    if (!tourToUpdate) {
      throw CustomHTTPError.BadRequest(TOUR_NOT_FOUND);
    }

    return tourToUpdate;
  }

  async deleteTour(id) {
    const tourToDelete = await tourSchema.findByIdAndDelete(id);

    if (!tourToDelete) {
      throw CustomHTTPError.BadRequest(TOUR_NOT_FOUND);
    }
  }
}

module.exports = new tourService();
