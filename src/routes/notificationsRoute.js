const { Router } = require('express');
const NotificationController = require('../controllers/NotificationController');

const router = Router();

router.get('/notifications', NotificationController.read);

router.get('/notifications/:id', NotificationController.read);

router.post('/notifications', NotificationController.create);

router.put('/notifications/:id', NotificationController.update);

module.exports = router;