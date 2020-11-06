import firebase from "firebase/app";
import "firebase/auth"; //for side effects
import "firebase/firestore"; //for side effects
import "firebase/storage"; //for side effects
import { get, readable } from "svelte/store";
import firebaseConfig from "./config.js";

firebase.initializeApp(firebaseConfig);

export const user = readable(null, (setter) => {
  firebase.auth().onAuthStateChanged((u) => {
    setter(u);
  });
});

export const db = firebase.firestore();

function resolveUid(uid = null) {
  if (!uid) {
    const $user = get(user);
    if ($user) {
      return $user.uid;
    } else {
      throw "No uid supplied and user not logged in";
    }
  } else {
    return uid;
  }
}

export function getUserDoc(uid = null) {
  uid = resolveUid(uid);
  return db.doc(`users/${uid}`);
}

export async function upload(path, file) {
  const ref = firebase.storage().ref(path);
  const task = await ref.put(file);
  return task;
}

export async function uploadContactPicture(contactId, file, uid = null) {
  uid = resolveUid(uid);
  const path = `users/${uid}/images/contacts/${contactId}.jpg`;
  return upload(path, file);
}

export async function getContactPicture(contactId, uid = null) {
  uid = resolveUid(uid);
  const path = `users/${uid}/images/contacts/${contactId}.jpg`;
  const ref = firebase.storage().ref(path);
  return await ref.getDownloadURL();
}
