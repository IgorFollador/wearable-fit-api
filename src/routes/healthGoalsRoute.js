const { Router } = require('express');
const HealthGoalController = require('../controllers/HealthGoalController');

const router = Router();

router.get('/healthGoals/:id', HealthGoalController.readById);

router.get('/healthGoals/client/:id', HealthGoalController.readAllByClientId);

router.get('/healthGoals/professional/:id', HealthGoalController.readAllByProfessionalId);

router.post('/healthGoals', HealthGoalController.create);

router.put('/healthGoals/:id', HealthGoalController.update);

router.put('/healthGoals/recover/:id', HealthGoalController.recover)

router.delete('/healthGoals/:id', HealthGoalController.delete);

module.exports = router;