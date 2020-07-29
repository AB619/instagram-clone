import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({

    apiKey: "AIzaSyCAr4iES1g-c2iMIHYc1OvqO0me0KDxHAI",
    authDomain: "instagram-clone-ab.firebaseapp.com",
    databaseURL: "https://instagram-clone-ab.firebaseio.com",
    projectId: "instagram-clone-ab",
    storageBucket: "instagram-clone-ab.appspot.com",
    messagingSenderId: "920312603786",
    appId: "1:920312603786:web:02b7f4c71590224d467973",
    measurementId: "G-FSN2WM5EXN"

});

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };