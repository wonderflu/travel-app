const tourSchema = require('../models/tour');

class tourService {
  async getAllTours(queryObject) {
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObject[el]);

    let queryStr = JSON.stringify(queryObject);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    const query = tourSchema.find(JSON.parse(queryStr));

    const tours = await query;

    return tours;
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
