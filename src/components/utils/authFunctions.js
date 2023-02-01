import {
    setAccessTokenReducer,
    setDataFetchedReducer,
} from "../redux/reducers/authReducer";

import {
    resetClassroomReducer,
    setClassroomReducer,
} from "../redux/reducers/classroomReducers";
import {
    resetLessonReducer,
    setLessonReducer,
} from "../redux/reducers/lessonReducer";
import {
    resetProfileReducer,
    setWorkingDaysReducer,
    setTimingReducer,
} from "../redux/reducers/profileReducer";
import {
    resetSemesterReducer,
    setSemesterReducer,
} from "../redux/reducers/semesterReducer";
import {
    resetSubjectReducer,
    setSubjectReducer,
} from "../redux/reducers/subjectReducer";
import {
    resetTeacherReducer,
    setTeacherReducer,
} from "../redux/reducers/teacherReducers";

export const KEY_REDUCER = [
    {
        key: "bellTiming",
        reducer: setTimingReducer,
    },
    {
        key: "workingDay",
        reducer: setWorkingDaysReducer,
    },
    {
        key: "subject",
        reducer: setSubjectReducer,
    },
    {
        key: "semester",
        reducer: setSemesterReducer,
    },
    {
        key: "teacher",
        reducer: setTeacherReducer,
    },
    {
        key: "classroom",
        reducer: setClassroomReducer,
    },
    {
        key: "lesson",
        reducer: setLessonReducer,
    },
];

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
    dispatch(setDataFetchedReducer(true));
};

export const unauthorized = (err, dispatch) => {
    if (err.response.status === 401) {
        console.log("Logged Out");
        dispatch(setAccessTokenReducer(null));
        resetAllState(dispatch);
    }
};
