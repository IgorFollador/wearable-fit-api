const { Router } = require('express');
const AuthenticationController = require('../controllers/AuthenticationController');

const router = Router();

router.get('/callback/google', AuthenticationController.callbackGoogle);

module.exports = router;