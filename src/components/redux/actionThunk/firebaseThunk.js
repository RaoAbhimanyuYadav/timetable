import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore/lite";

import { db, auth } from "../../api/firebase";
import { setUserReducer } from "../reducers/authReducer";

export const addOneDoc =
  (collectionName, reducer, docData, user) => async (dispatch) => {
    const docRef = doc(db, "users", user.uid);

    const data = {};
    data[collectionName] = arrayUnion(docData);
    await updateDoc(docRef, data);

    dispatch(reducer(docData));
  };

export const getAllDocs =
  (collectionList, reducers, setIsLoading, user) => async (dispatch) => {
    const docSnap = await getDoc(doc(db, "users", user.uid));

    if (docSnap.exists()) {
      const fetchedData = docSnap.data();
      collectionList.forEach((element, i) => {
        dispatch(reducers[i](fetchedData[element]));
      });
    } else {
      // error in fetching
    }

    setIsLoading(false);
  };

export const updateOneDoc =
  (collectionName, reducer, docData, newDocData, user) => async (dispatch) => {
    const docRef = doc(db, "users", user.uid);

    const data = {};
    data[collectionName] = arrayRemove(docData);
    await updateDoc(docRef, data);

    const newData = {};
    newData[collectionName] = arrayUnion(newDocData);
    await updateDoc(docRef, newData);

    dispatch(reducer({ newData: newDocData, oldData: docData }));
  };

export const deleteOneDoc =
  (collectionName, reducer, docData, user) => async (dispatch) => {
    const docRef = doc(db, "users", user.uid);

    const data = {};
    data[collectionName] = arrayRemove(docData);
    await updateDoc(docRef, data);

    dispatch(reducer(docData));
  };

export const addNewUser =
  (email, password, redirectFunc) => async (dispatch) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
    if (userCredential) {
      // Signed in
      const body = {
        email: userCredential.user.email,
        refreshToken: userCredential.user.refreshToken,
        uid: userCredential.user.uid,
      };
      await setDoc(doc(db, "users", body.uid), { email: body.email });
      dispatch(setUserReducer(body));
      redirectFunc();
    }
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
