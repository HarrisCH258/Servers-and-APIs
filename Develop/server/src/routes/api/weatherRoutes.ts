import { Router, type Request, type Response } from 'express';

const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data

//router.post()
router.post('/', async (req: Request, res: Response) => {
  // TODO: GET weather data from city name
  const city =req.body.cityName;
  try {
    const weatherData = await WeatherService.getWeatherForCity(city);
    res.json(weatherData);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Error fetching weather data' });
  }
  // TODO: save city to search history
  try {
    await HistoryService.addCity(city);
  } catch (err) {
    console.log(err);
  }
});

// TODO: GET search history
router.get('/history', async (_req: Request, res: Response) => {
  try {
    const cities = await HistoryService.getCities();
    res.json(cities);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Error fetching search history' });
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      res.status(400).json({ message: 'City ID is required' });
    }
    await HistoryService.removeCity(req.params.id);
    res.json({ message: 'City removed from search history' });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Error removing city from search history' });
  }
});

export default router;
