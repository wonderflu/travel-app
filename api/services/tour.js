const TourSchema = require('../models/tour');
const APIFeatures = require('../../utils/apiFeature');
const CustomHTTPError = require('../../utils/error');
const { TOUR_NOT_FOUND } = require('../../consts/error');
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

    // const tours = await features.query.explain();

    const tours = await features.query;

    return { totalTours: total, currentPage: page, limitPerPage: limit, tours };
  }

  async createTour(tour) {
    const newTour = await TourSchema.create({ ...tour });

    return newTour;
  }

  async getOneTour(id) {
    const tour = await TourSchema.findById(id).populate('reviews');

    if (!tour) {
      throw CustomHTTPError.BadRequest(TOUR_NOT_FOUND);
    }

    return tour;
  }

  async updateTour(id, price) {
    const updatedTour = await TourSchema.findByIdAndUpdate(id, price, {
      new: true,
      runValidators: true,
    });

    if (!updatedTour) {
      throw CustomHTTPError.BadRequest(TOUR_NOT_FOUND);
    }

    return updatedTour;
  }

  async deleteTour(id) {
    const deletedTour = await TourSchema.findByIdAndDelete(id);

    if (!deletedTour) {
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
