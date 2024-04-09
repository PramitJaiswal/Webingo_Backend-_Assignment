const User = require('../models/user');
const geofencingUtils = require('../utils/geofencing');
const config = require('../config/config');

exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, latitude, longitude } = req.body;
    // Validate input data
    if (!firstName || !lastName || !latitude || !longitude) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    // Create new user
    const newUser = new User({ firstName, lastName, latitude, longitude });
    await newUser.save();
    return res.status(201).json({ message: "User account created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// controllers/userController.js

exports.checkGeofence = async (req, res) => {
    try {
      const { userId, targetLatitude, targetLongitude, radius } = req.body;
      
      // Input validation
      if (!userId || !targetLatitude || !targetLongitude || !radius) {
        return res.status(400).json({ message: "Missing required fields" });
      }
  
      // Validate latitude and longitude format
      if (typeof targetLatitude !== 'number' || typeof targetLongitude !== 'number' ||
          isNaN(targetLatitude) || isNaN(targetLongitude)) {
        return res.status(400).json({ message: "Invalid latitude or longitude format" });
      }
  
      // Find user by ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Check if user is within radius of target location
      const withinRadius = await geofencingUtils.isWithinRadius(user.latitude, user.longitude, targetLatitude, targetLongitude, radius, config.googleMapsApiKey);
      if (withinRadius) {
        return res.status(200).json({ message: "User is within the radius" });
      } else {
        return res.status(400).json({ message: "User is not within the radius" });
      }
    } catch (error) {
      console.error("Error checking geofence:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  