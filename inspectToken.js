const admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

const inspectToken = async (idToken) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    console.log('Decoded Token:', decodedToken);
  } catch (error) {
    console.error('Error verifying ID token:', error);
  }
};

// Replace this with the actual ID token you want to inspect
const idToken = 'YOUR_ID_TOKEN_HERE';
inspectToken(idToken);
