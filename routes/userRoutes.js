const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route for creating a new user account
router.post('/create', userController.createUser);

// Route for checking geofence
router.post('/geofence', userController.checkGeofence);

module.exports = router;
