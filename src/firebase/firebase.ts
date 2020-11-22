import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
import Vue from 'vue';
import store from '../store/index';

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

const firebaseApp = firebase.default.initializeApp(firebaseConfig);

export const fs = firebaseApp.firestore();
export const database = firebaseApp.database();

export default {
  auth: firebase.default.auth(),
  loginGoogle() {
    const provider = new firebase.default.auth.GoogleAuthProvider();
    firebase.default.auth().signInWithPopup(provider)
      .then(function () {
        Vue.toasted.show("Logged-in with google, Hello", {
          icon: "login",
          theme: "bubble",
          position: "bottom-right",
          duration: 5000
        });
      })
      .catch(function (error) {
        Vue.toasted.show("Error google..", {
          icon: "error_outline",
          theme: "bubble",
          position: "bottom-right",
          duration: 5000
        });
      });
  },
  logout() {
    firebase.default.auth().signOut()
      .then(function () {
        Vue.toasted.show("You logged-out, goodbye", {
          icon: "subdirectory_arrow_left",
          theme: "bubble",
          position: "bottom-right",
          duration: 5000
        });
      })
      .catch(function (error) {
        Vue.toasted.show("Cannot log-out", {
          icon: "error_outline",
          theme: "bubble",
          position: "bottom-right",
          duration: 5000
        });
      });
  },
  signUpEmail(email: string, password: string): Promise<{}> {
    return new Promise((resolve, reject) => {
      firebase
        .default.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          resolve({ success: true });
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  loginEmail(email: string, password: string): Promise<{}> {
    return new Promise((resolve, reject) => {
      firebase
        .default.auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          resolve({ success: true });
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  sendResetPassEmail(emailAddress: string): Promise<{}> {
    return new Promise((resolve, reject) => {
      firebase.default.auth().sendPasswordResetEmail(emailAddress).then(() => {
        resolve({ success: true });
      })
        .catch(error => {
          reject(error);
        });
    });
  },
  setAuthChange() {
    const user = {
      loggedIn: false,
      data: {}
    };
    firebase.default.auth().onAuthStateChanged(userfb => {
      if (userfb) {
        user.loggedIn = true;
        user.data = userfb;
        const uid: string = userfb.uid;
        store.dispatch('fetchTodos', uid);
      } else {
        user.loggedIn = false;
        user.data = {};
        store.commit('setTodoList', []);
      }
      store.commit('setUser', user);
    });
  }
};
