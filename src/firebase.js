import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyB_TRaZrdg2TDcTGL_JX5HMIb8SGcu94oo",
  authDomain: "whats-app-clone-f5f78.firebaseapp.com",
  projectId: "whats-app-clone-f5f78",
  storageBucket: "whats-app-clone-f5f78.appspot.com",
  messagingSenderId: "1051366322183",
  appId: "1:1051366322183:web:1bf4afa20126d863453aa2"
}

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider}
export default db;