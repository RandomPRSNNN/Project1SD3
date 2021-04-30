// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBdVxFSSBL7a1DYeTix5sfulXA7Nz8c3w0",
    authDomain: "edsprojectdev.firebaseapp.com",
    projectId: "edsprojectdev",
    storageBucket: "edsprojectdev.appspot.com",
    messagingSenderId: "783653499776",
    appId: "1:783653499776:web:8187f15a2761d866790765"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// make auth and firestore references
const auth = firebase.auth();
const db = firebase.firestore();
const functions = firebase.functions();

// update firestore settings
db.settings({timestampsInSnapshots: true});