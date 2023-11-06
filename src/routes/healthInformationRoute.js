const { Router } = require('express');
const HealthInformationController = require('../controllers/HealthInformationController');

const router = Router();

router.get('/healthInformation/weakly', HealthInformationController.readWeaklyHealthDataByUserId);

module.exports = router;