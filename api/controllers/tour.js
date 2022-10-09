const TourService = require('../services/tour');

class TourController {
  async getAllTours(req, res) {
    const q = { ...req.query };
    const data = await TourService.getAllTours(q);

    res.json({ data });
  }

  async createTour(req, res) {
    const tour = req.body;

    const newTour = await TourService.createTour(tour);

    res.status(201).json({ newTour });
  }

  async getOneTour(req, res) {
    const { id } = req.params;

    const tour = await TourService.getOneTour(id);

    res.json({ tour });
  }

  async updateTour(req, res) {
    const { id } = req.params.id;
    const { price } = req.body;

    const tourToUpdate = await TourService.updateTour(id, price);

    res.json({ tourToUpdate });
  }

  async deleteTour(req, res) {
    const { id } = req.params;

    await TourService.deleteTour(id);

    res.status(204).json();
  }

  async getTourStats(req, res) {
    const tourStats = await TourService.getTourStats();

    res.json({ tourStats });
  }

  async getMonthlyPlan(req, res) {
    const { year } = req.params;

    const monthlyPlan = await TourService.getMonthlyPlan(year);

    res.json({ monthlyPlan });
  }
}

module.exports = new TourController();
