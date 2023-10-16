const { Router } = require('express');
const AuthenticationController = require('../controllers/AuthenticationController');
const UserController = require('../controllers/UserController');
const router = Router();

router.post('/auth', AuthenticationController.authenticate);

router.get('/auth/google', AuthenticationController.authorizateGoogleUser);

router.get('/google/authCallback', AuthenticationController.authCallback);

router.post('/users', UserController.create);

module.exports = router;