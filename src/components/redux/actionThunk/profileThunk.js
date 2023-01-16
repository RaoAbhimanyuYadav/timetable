import { collection, getDocs, doc, setDoc } from "firebase/firestore/lite";

import { db } from "../../api/firebase";
import {
  addTimingReducer,
  setProfileReducer,
  setTimingReducer,
  updateTimingReducer,
} from "../reducers/profileReducer";

const timingColRef = collection(db, "timings");

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
    await setDoc(doc(db, "timings", timingDataObj.name), timingDataObj);
    dispatch(addTimingReducer({ ...timingDataObj, id: timingDataObj.name }));
  };
}

export const getAllTiming = () => async (dispatch) => {
  const timingSnapshot = await getDocs(timingColRef);
  const timingList = timingSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  dispatch(setTimingReducer(timingList));
};

export const updateOneTiming = (timingDataObj, id) => async (dispatch) => {
  await setDoc(doc(db, "timings", id), timingDataObj);
  dispatch(updateTimingReducer({ ...timingDataObj, id: id }));
};
