const tourService = require('../services/tour');

class TourController {
  async getAllTours(req, res) {
    const queryObject = { ...req.query };
    const tours = await tourService.getAllTours(queryObject);

    res.json({ tours });
  }

  async createTour(req, res) {
    const tour = req.body;

    const newTour = await tourService.createTour(tour);

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
