const { Router } = require('express');
const HealthGoalController = require('../controllers/HealthGoalController');

const router = Router();

router.get('/health-goals', HealthGoalController.readByUser);

router.get('/health-goals/client/:id', HealthGoalController.readByUser);

router.get('/health-goals/professional/:id', HealthGoalController.readAllByProfessionalId);

router.get('/health-goals/:id', HealthGoalController.readById);

router.post('/health-goals', HealthGoalController.create);

router.put('/health-goals/client/:id', HealthGoalController.createOrUpdate);

router.put('/health-goals/:id', HealthGoalController.update);

router.put('/health-goals/recover/:id', HealthGoalController.recover)

router.delete('/health-goals/:id', HealthGoalController.delete);

module.exports = router;