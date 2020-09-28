import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyChdropJqIFhiwM5fFmKGqiArntOXkVxLk',
  authDomain: 'advancedtodolist-5aaec.firebaseapp.com',
  databaseURL: 'https://advancedtodolist-5aaec.firebaseio.com',
  projectId: 'advancedtodolist-5aaec',
  storageBucket: 'advancedtodolist-5aaec.appspot.com',
  messagingSenderId: '65198032438',
  appId: '1:65198032438:web:399ca8bb024d70abf23a97',
  measurementId: 'G-WYDMNK5ZVN'
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();

export default {
  auth: firebase.auth(),
  loginGoogle () {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then(function (result) {
        console.log(result);
      })
      .catch(function (error){
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
        console.log(errorCode, errorMessage, email, credential);
      });
  },
  logout () {
    firebase.auth().signOut()
      .then(function () {})
      .catch(function (error) {
        console.log(error);
      });
  },
  signUpEmail (email, password) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('signup email ok');
        return Promise.resolve;
      })
      .catch(error => {
        console.log('error signup email', error);
        this.error = error;
        return Promise.reject;
      });
  },
  loginEmail (email, password) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((data) => {
        console.log('ok log email', data);
      })
      .catch(error => {
        console.log('error login email', error);
        this.error = error;
      });
  }
};
