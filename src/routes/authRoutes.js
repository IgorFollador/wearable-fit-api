const { Router } = require('express');
const AuthenticationController = require('../controllers/AuthenticationController');

const router = Router();

router.get('/google/authorization', AuthenticationController.getGoogleTokens);

module.exports = router;