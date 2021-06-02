
const admin = require("firebase-admin");

// const serviceAccount = require("./private-key.json");

let serviceAccount; 
if ( process.env.PRIVATE_KEY ) {
    // På Heroku
    serviceAccount = JSON.parse(process.env.PRIVATE_KEY)
} else {
    // Lokalt
    serviceAccount = require("./private-key.json");
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});







function getDataBase() {
	return admin.firestore()
}

module.exports = getDataBase