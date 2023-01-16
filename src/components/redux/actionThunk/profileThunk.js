import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  addDoc,
} from "firebase/firestore/lite";

import { db } from "../../api/firebase";

export const addOneDoc =
  (collectionName, reducer, docData) => async (dispatch) => {
    const newDocRef = await addDoc(collection(db, collectionName), docData);
    dispatch(reducer({ ...docData, id: newDocRef.id }));
  };

export const getAllDocs = (collectionName, reducer) => async (dispatch) => {
  const snapshot = await getDocs(collection(db, collectionName));
  const list = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  dispatch(reducer(list));
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
