const { Router } = require('express');
const AuthenticationController = require('../controllers/AuthenticationController');

const router = Router();

router.get('/google/authUrlCallback', AuthenticationController.callbackGoogle);

router.get('/google', AuthenticationController.authorizateGoogleUser);

module.exports = router;