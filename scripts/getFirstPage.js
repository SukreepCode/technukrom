require('now-env'); // using now-env instead of `require("dotenv").config();`
async function firestoreInit() {

  const firebase_app = require("@firebase/app");
  const firebase = firebase_app.default;
  const firestore = require("@firebase/firestore");

  try {
    firebase.initializeApp({
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID
    });
  } catch (err) {
    if (!/already exists/.test(err.message)) {
      console.error("Firebase initialization error", err.stack);
    }
  }

  return firebase.firestore();
}

// console.log("wef");
// const getFirstPage = function(){
//   // console.log("wef");
  // var data = []
  const db = firestoreInit()
  var sfRef = db.collection("posts").orderBy("published", "desc").limit(20)
  var getDoc = sfRef.get()
    .then(doc => {
      if (!doc.exists) {
        // console.log('No such document!');
      } else {
        // console.log('Document data:', doc.data());
      }
    })
    .catch(err => {
      // console.log('Error getting document', err);
    });

// }
// export getFirstPage;

