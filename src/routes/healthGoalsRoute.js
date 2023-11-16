const { Router } = require('express');
const HealthGoalController = require('../controllers/HealthGoalController');

const router = Router();

router.get('/health-goals/:id', HealthGoalController.readById);

router.get('/health-goals/client/:id', HealthGoalController.readAllByClientId);

router.get('/health-goals/professional/:id', HealthGoalController.readAllByProfessionalId);

router.post('/health-goals', HealthGoalController.create);

router.put('/health-goals/:id', HealthGoalController.update);

router.put('/health-goals/recover/:id', HealthGoalController.recover)

router.delete('/health-goals/:id', HealthGoalController.delete);

module.exports = router;