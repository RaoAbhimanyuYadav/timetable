import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore/lite";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDz4IZKkIZCQ7os0SXR8w_Ge_GS74SdqEQ",
  authDomain: "nith-timtable.firebaseapp.com",
  projectId: "nith-timtable",
  storageBucket: "nith-timtable.appspot.com",
  messagingSenderId: "844155499158",
  appId: "1:844155499158:web:e17bb90cf50edccb7008b7",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
