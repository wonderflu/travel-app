const TourSchema = require('../models/tour');
const APIFeatures = require('../../utils/apiFeature');
const CustomHTTPError = require('../../utils/error');
const { TOUR_ALREADY_EXISTS, TOUR_NOT_FOUND } = require('../../consts/error');
class tourService {
  async getAllTours(q) {
    const page = q.page * 1 || 1;
    const limit = q.limit * 1 || 10;
    const total = await TourSchema.countDocuments();

    const features = new APIFeatures(TourSchema.find(), q)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const tours = await features.query;

    return { totalTours: total, currentPage: page, limitPerPage: limit, tours };
  }

  async createTour(tour) {
    const duplicate = await TourSchema.findOne({ name: tour.name });

    if (duplicate) {
      throw CustomHTTPError.BadRequest(TOUR_ALREADY_EXISTS);
    }

    const newTour = await TourSchema.create({ ...tour });

    return newTour;
  }

  async getOneTour(id) {
    const tour = await TourSchema.findById(id);

    if (!tour) {
      throw CustomHTTPError.BadRequest(TOUR_NOT_FOUND);
    }

    return tour;
  }

  async updateTour(id, price) {
    const tourToUpdate = await TourSchema.findByIdAndUpdate(id, price, {
      new: true,
      runValidators: true,
    });

    if (!tourToUpdate) {
      throw CustomHTTPError.BadRequest(TOUR_NOT_FOUND);
    }

    return tourToUpdate;
  }

  async deleteTour(id) {
    const tourToDelete = await TourSchema.findByIdAndDelete(id);

    if (!tourToDelete) {
      throw CustomHTTPError.BadRequest(TOUR_NOT_FOUND);
    }
  }

  async getTourStats() {
    const tourStats = await TourSchema.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          _id: '$difficulty',
          numTours: { $sum: 1 },
          numRatings: { $avg: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      {
        $sort: { avgPrice: 1 },
      },
    ]);

    return tourStats;
  }

  // biz problem: to calculate the busiest month of a given year
  async getMonthlyPlan(year) {
    const monthlyPlan = await TourSchema.aggregate([
      {
        $unwind: '$startDates',
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${parseInt(year)}-01-01`),
            $lte: new Date(`${parseInt(year)}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numTourStarts: { $sum: 1 },
          tours: { $push: '$name' },
        },
      },
      {
        $addFields: { month: '$_id' },
      },
      {
        $project: {
          _id: 0,
        },
      },
      {
        $sort: { numTourStarts: -1 },
      },
    ]);

    return monthlyPlan;
  }
}

module.exports = new tourService();
