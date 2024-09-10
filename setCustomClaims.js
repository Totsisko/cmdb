// setCustomClaims.js
const admin = require('firebase-admin');
admin.initializeApp();

// Replace this with the actual user ID and desired role
const uid = 'USER_ID_HERE'; // Replace with actual UID
const role = 'Admin'; // Desired role

admin.auth().setCustomUserClaims(uid, { role })
  .then(() => {
    console.log('Custom claims set for user');
  })
  .catch(error => {
    console.error('Error setting custom claims:', error);
  });
