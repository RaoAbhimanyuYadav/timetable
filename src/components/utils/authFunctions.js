import {
    setAccessTokenReducer,
    setDataFetchedReducer,
} from "../redux/reducers/authReducer";

import { resetClassroomReducer } from "../redux/reducers/classroomReducers";
import { resetLessonReducer } from "../redux/reducers/lessonReducer";
import { resetProfileReducer } from "../redux/reducers/profileReducer";
import { resetSemesterReducer } from "../redux/reducers/semesterReducer";
import { resetSubjectReducer } from "../redux/reducers/subjectReducer";
import { resetTeacherReducer } from "../redux/reducers/teacherReducers";

export const resetAllState = (dispatch) => {
    [
        resetClassroomReducer,
        resetLessonReducer,
        resetProfileReducer,
        resetSemesterReducer,
        resetSubjectReducer,
        resetTeacherReducer,
    ].forEach((reducer) => {
        dispatch(reducer());
    });

    dispatch(setAccessTokenReducer(null));
    dispatch(setDataFetchedReducer(false));
};

export const unauthorized = (err, dispatch) => {
    if (err.response.status === 401) {
        console.log("Logged Out");
        dispatch(setAccessTokenReducer(null));
        resetAllState(dispatch);
    }
};
