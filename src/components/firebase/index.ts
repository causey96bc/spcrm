import firebase from "firebase/app";
import "firebase/auth"; //for side effects
import "firebase/firestore"; //for side effects
import { get, readable } from "svelte/store";
import firebaseConfig from "./config.js";

firebase.initializeApp(firebaseConfig);

export const user = readable(null, (setter) => {
  firebase.auth().onAuthStateChanged((u) => {
    setter(u);
  });
});

export const db = firebase.firestore();

export function getUserDoc(uid = null) {
  if (!uid) {
    const $user = get(user);
    if ($user) {
      uid = $user.uid;
    } else {
      throw "No uid supplied and user not logged in";
    }
  }
  return db.doc(`users/${uid}`);
}
