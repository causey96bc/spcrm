import firebase from "firebase/app";
import "firebase/auth"; //for side effects
import "firebase/firestore"; //for side effects
import "firebase/storage"; //for side effects
import { readable } from "svelte/store";
import firebaseConfig from "./config.js";

firebase.initializeApp(firebaseConfig);

export const user = readable(null, (setter) => {
    firebase.auth().onAuthStateChanged((u) => {
        setter(u);
    });
});

export const db = firebase.firestore();

export function getUserDoc(uid) {
    return db.doc(`users/${uid}`);
}
