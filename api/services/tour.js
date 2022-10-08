const tourSchema = require('../models/tour');

class tourService {
  async getAllTours() {
    const tours = await tourSchema.find();

    return tours;
  }

  async createTour(name, price) {
    const newTour = await tourSchema.create({ name, price });

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
