import firebase from 'firebase/app';
import 'firebase/auth';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  });
}

export const providerTwitter = new firebase.auth.TwitterAuthProvider()

export const auth = firebase.auth()


export default firebase;