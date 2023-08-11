const { Router } = require('express');
const UserController = require('../controllers/UserController');

const router = Router();

router.get('/users', UserController.read);

router.put('/users', UserController.update);

router.put('/users/recover/:id', UserController.recover)

router.delete('/users/:id', UserController.delete);

module.exports = router;