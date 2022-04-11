import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { useState } from 'react';
const firebaseConfig = {
  apiKey: 'AIzaSyBRzzNS4B6W5C3hxxwsbocmXfPlVICBrsM',
  authDomain: 'todo-fdd5f.firebaseapp.com',
  projectId: 'todo-fdd5f',
  storageBucket: 'todo-fdd5f.appspot.com',
  messagingSenderId: '410413788751',
  appId: '1:410413788751:web:8010a71f7318391ed3843a',
};

// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const createUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email } = user;
    const { displayName } = additionalData;

    try {
      await userRef.set({});
    } catch (error) {
      console.log('Error in creating user', error);
    }
  }
};
