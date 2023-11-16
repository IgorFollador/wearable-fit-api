const { Router } = require('express');
const HealthInformationController = require('../controllers/HealthInformationController');

const router = Router();

router.get('/health/steps/:date', HealthInformationController.readStepsByDate);

router.get('/health/calories/:date', HealthInformationController.readCaloriesByDate);

router.get('/health/sleep/:date', HealthInformationController.readSleepByDate);

router.get('/health/activity/:date', HealthInformationController.readActivityByDate);

router.get('/health/heart-rate/:date', HealthInformationController.readHeartRateByDate);

router.get('/health/:date', HealthInformationController.readAllHealthInformationByDate);

module.exports = router;