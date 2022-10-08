const tourSchema = require('../models/tour');

class tourService {
  async getAllTours(queryObject) {
    // const excludedFields = ['page', 'sort', 'limit', 'fields'];
    // excludedFields.forEach((el) => delete queryObject[el]);

    let queryStr = JSON.stringify(queryObject);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = tourSchema.find(JSON.parse(queryStr));

    if (queryObject.sort) {
      const sortBy = queryObject.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    if (queryObject.fields) {
      const fields = queryObject.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    const page = queryObject.page * 1 || 1;
    const limit = queryObject.limit * 1 || 10;
    const skip = (page - 1) * limit;
    const total = await tourSchema.find({}).count();

    query = query.skip(skip).limit(limit);

    const tours = await query;

    return { currentPage: page, total, limit, tours };
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
