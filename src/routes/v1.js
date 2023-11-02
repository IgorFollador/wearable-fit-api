
const { Router } = require('express');

const publicRouter = require('./publicRoutes');
const usersRouter = require('./usersRoute');
const notificationsRouter = require('./notificationsRoute');
const healthGoalsRouter = require('./healthGoalsRoute');

const AuthenticationController = require('../controllers/AuthenticationController');

const v1 = Router();

// Routes without authentication
v1.use(publicRouter); 

// Authentication middleware
v1.use(AuthenticationController.authorize)

// Authenticated routes
v1.use(usersRouter);

v1.use(notificationsRouter);

v1.use(healthGoalsRouter);

module.exports = v1;
