
const { Router } = require('express');

const publicRouter = require('./publicRoutes');
const authRouter = require('./authRoutes');
const usersRouter = require('./usersRoute');
const notificationsRouter = require('./notificationsRoute');
const healthGoalsRouter = require('./healthGoalsRoute');
const healthInformationRouter = require('./healthInformationRoute');

const AuthenticationController = require('../controllers/AuthenticationController');

const v1 = Router();

// Routes without authentication
v1.use(publicRouter); 

// Authentication middleware
v1.use(AuthenticationController.authorize)

// Authenticated routes
v1.use(authRouter);

v1.use(usersRouter);

v1.use(notificationsRouter);

v1.use(healthGoalsRouter);

v1.use(healthInformationRouter);

module.exports = v1;
