import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  addDoc,
} from "firebase/firestore/lite";

import { db } from "../../api/firebase";
import {
  addTimingReducer,
  deleteTimingReducer,
  setProfileReducer,
  setTimingReducer,
  updateTimingReducer,
} from "../reducers/profileReducer";

const timingColName = "timings";

export function fetchProfile() {
  return async function fetchProfileThunk(dispatch) {
    const profileCol = collection(db, "profile");
    const profileSnapshot = await getDocs(profileCol);
    const profileList = profileSnapshot.docs.map((doc) => doc.data());
    dispatch(setProfileReducer(profileList));
  };
}

export function addOneTiming(timingDataObj) {
  return async function addTimingThunk(dispatch) {
    const newDocRef = await addDoc(
      collection(db, timingColName),
      timingDataObj
    );
    dispatch(addTimingReducer({ ...timingDataObj, id: newDocRef.id }));
  };
}

export const getAllTiming = () => async (dispatch) => {
  const timingSnapshot = await getDocs(collection(db, timingColName));
  const timingList = timingSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  dispatch(setTimingReducer(timingList));
};

export const updateOneTiming = (timingDataObj, id) => async (dispatch) => {
  await setDoc(doc(db, timingColName, id), timingDataObj);
  dispatch(updateTimingReducer({ ...timingDataObj, id: id }));
};

export const deleteOneTiming = (id) => async (dispatch) => {
  await deleteDoc(doc(db, timingColName, id));
  dispatch(deleteTimingReducer({ id: id }));
};
