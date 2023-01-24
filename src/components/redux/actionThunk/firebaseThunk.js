import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  addDoc,
} from "firebase/firestore/lite";

import { db, auth } from "../../api/firebase";
import { setUserReducer } from "../reducers/authReducer";

export const addOneDoc =
  (collectionName, reducer, docData) => async (dispatch) => {
    const newDocRef = await addDoc(collection(db, collectionName), docData);
    dispatch(reducer({ ...docData, id: newDocRef.id }));
  };

export const getAllDocs =
  (collectionName, reducer, setIsLoading) => async (dispatch) => {
    const snapshot = await getDocs(collection(db, collectionName));
    const list = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    dispatch(reducer(list));
    setIsLoading(false);
  };

export const updateOneDoc =
  (collectionName, reducer, docData, id) => async (dispatch) => {
    await setDoc(doc(db, collectionName, id), docData);
    dispatch(reducer({ ...docData, id: id }));
  };

export const deleteOneDoc =
  (collectionName, reducer, id) => async (dispatch) => {
    await deleteDoc(doc(db, collectionName, id));
    dispatch(reducer({ id: id }));
  };

export const addNewUser =
  (email, password, redirectFunc) => async (dispatch) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const body = {
          email: userCredential.user.email,
          refreshToken: userCredential.user.refreshToken,
          uid: userCredential.user.uid,
        };
        dispatch(setUserReducer(body));
        redirectFunc();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

export const login = (email, password, redirectFunc) => async (dispatch) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const body = {
        email: userCredential.user.email,
        refreshToken: userCredential.user.refreshToken,
        uid: userCredential.user.uid,
      };
      dispatch(setUserReducer(body));
      redirectFunc();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
};

export const logout = () => async (dispatch) => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      dispatch(setUserReducer(null));
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
};
