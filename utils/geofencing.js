const axios = require('axios');

// Function to calculate distance between two coordinates using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c; // Distance in kilometers
  return distance * 1000; // Convert to meters
}

// Function to check if user is within given radius of target location
async function isWithinRadius(userLat, userLon, targetLat, targetLon, radius, apiKey) {
  const distance = calculateDistance(userLat, userLon, targetLat, targetLon);
  return distance <= radius;
}

module.exports = { calculateDistance, isWithinRadius };
