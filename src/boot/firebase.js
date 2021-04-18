import firebase from 'firebase/app'
import 'firebase/analytics'
// import "firebase/auth";
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyCWsaAFrKNM82v2fRkaivURCrsBxwVvC7g',
    authDomain: 'qwitter-45193.firebaseapp.com',
    projectId: 'qwitter-45193',
    storageBucket: 'qwitter-45193.appspot.com',
    messagingSenderId: '466014875032',
    appId: '1:466014875032:web:1a3fc1b8b30f5c8f95cfed',
    measurementId: 'G-Q963H8SRCN'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()
let db = firebase.firestore()
export default db
