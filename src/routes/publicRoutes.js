const { Router } = require('express');
const AuthenticationController = require('../controllers/AuthenticationController');
const UserController = require('../controllers/UserController');
const router = Router();

router.post('/auth', AuthenticationController.authenticate);

router.get('/auth/google', AuthenticationController.authorizateGoogleUser);

router.get('/google/authorization', AuthenticationController.getGoogleTokens);

router.post('/users', UserController.create);

router.post('/users/validate-email', UserController.validateEmailRegistration);

module.exports = router;