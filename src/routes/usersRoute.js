const { Router } = require('express');
const UserController = require('../controllers/UserController');

const router = Router();

router.get('/users/recoverInformation', UserController.recoverUser);

router.get('/users/clients', UserController.readAllClientsByProfessional);

router.get('/users/settings', UserController.readSettings);

router.get('/users/:id', UserController.readById);

router.get('/users', UserController.read);

router.put('/users', UserController.update);

router.put('/users/associate/client/:id', UserController.associateClientToProfessional);

router.put('/users/recover/:id', UserController.recover);

router.delete('/users/:id', UserController.delete);

module.exports = router;