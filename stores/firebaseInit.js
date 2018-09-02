// https://github.com/jeescu/react-firebase/blob/master/src/firebase.js
import firebase from 'firebase';

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  databaseURL: 'https://technukrom.firebaseio.com'
};

// fixed this https://github.com/zeit/next.js/issues/1999#issuecomment-302244429
if (!firebase.apps.length) {
  firebase.initializeApp(config) ;
}

export default firebase;

export const database = firebase.database();
export const firestore = firebase.firestore();
// export const auth = firebase.auth();
// export const storage = firebase.storage();
// export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
// export const messaging = firebase.messaging();

// usage import { database, firestore } from '../stores/firebaseInit'
