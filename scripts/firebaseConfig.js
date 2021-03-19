// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBYzv3_CIcmB0t5cxvEZLmeufnQtrpnbVI",
    authDomain: "edsprojectauth.firebaseapp.com",
    projectId: "edsprojectauth",
    storageBucket: "edsprojectauth.appspot.com",
    messagingSenderId: "695870823041",
    appId: "1:695870823041:web:ac9dafbb5efdc534e24b80"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// make auth and firestore references
const auth = firebase.auth();
const db = firebase.firestore();
const functions = firebase.functions();

// update firestore settings
db.settings({timestampsInSnapshots: true});