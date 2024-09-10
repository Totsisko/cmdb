const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.setUserRole = functions.https.onCall(async (data, context) => {
  // Check that the request is authenticated and the user has the right to set claims
  if (!context.auth || context.auth.token.role !== 'Admin') {
    return { error: 'Only admins can set roles.' };
  }

  const uid = data.uid;
  const role = data.role;

  try {
    await admin.auth().setCustomUserClaims(uid, { role });
    return { message: `Custom claims set for user ${uid}` };
  } catch (error) {
    console.error('Error setting custom claims:', error);
    return { error: 'Error setting custom claims' };
  }
});
