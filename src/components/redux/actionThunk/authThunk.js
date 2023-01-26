import axios from "../../api/axios";
import {
  setAccessTokenReducer,
  setDataFetchedReducer,
} from "../reducers/authReducer";
import { setClassroomReducer } from "../reducers/classroomReducers";
import {
  setTimingReducer,
  setWorkingDaysReducer,
} from "../reducers/profileReducer";
import { setSemesterReducer } from "../reducers/semesterReducer";
import { setSubjectReducer } from "../reducers/subjectReducer";
import { setTeacherReducer } from "../reducers/teacherReducers";

export const login = (email, password, redirectFunc) => async (dispatch) => {
  try {
    const resp = await axios.post("login/token/", {
      username: email,
      password: password,
    });
    const accessToken = resp.data.access;
    const refreshToken = resp.data.refresh;
    localStorage.setItem("refresh", JSON.stringify(refreshToken));
    dispatch(setAccessTokenReducer(accessToken));
    redirectFunc();
  } catch (err) {
    console.log(err);
  }
};

export const logout = () => async (dispatch) => {
  //   [
  //     setTimingReducer,
  //     setWorkingDaysReducer,
  //     setSubjectReducer,
  //     setSemesterReducer,
  //     setClassroomReducer,
  //     setTeacherReducer,
  //   ].forEach((reducer) => {
  //     dispatch(reducer([]));
  //   });

  //   dispatch(setDataFetchedReducer(false));

  dispatch(setAccessTokenReducer(null));
};

export const signup = (email, password, redirectFun) => async (dispatch) => {};
