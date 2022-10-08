const tourService = require('../services/tour');

class TourController {
  async getAllTours(req, res) {
    const tours = await tourService.getAllTours();

    res.json(tours);
  }

  async createTour(req, res) {
    const { name, price } = req.body;

    const newTour = await tourService.createTour(name, price);

    res.status(201).json(newTour);
  }

  async getOneTour(req, res) {
    const { id } = req.params;

    const tour = await tourService.getOneTour(id);

    res.json(tour);
  }

  async updateTour(req, res) {
    const { id } = req.params.id;
    const { price } = req.body;

    const tourToUpdate = await tourService.updateTour(id, price);

    res.json(tourToUpdate);
  }

  async deleteTour(req, res) {
    const { id } = req.params;

    await tourService.deleteTour(id);

    res.status(204).json();
  }
}

module.exports = new TourController();
