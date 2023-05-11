import { setAccessTokenReducer } from "../redux/reducers/authReducer";

import {
    resetClassroomReducer,
    setClassroomReducer,
} from "../redux/reducers/classroomReducers";
import {
    resetGroupsReducer,
    setGroupsReducer,
} from "../redux/reducers/groupReducer";

import { showNotificationReducer } from "../redux/reducers/notificationReducer";
import {
    resetProfileReducer,
    setWorkingDaysReducer,
    setTimingReducer,
} from "../redux/reducers/profileReducer";
import { resetSavedTimetableReducer } from "../redux/reducers/savedTimetableReducer";
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
import {
    resetTimeOffsReducer,
    setTimeOffsReducer,
} from "../redux/reducers/timeOffsReducer";

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
        key: "groups",
        reducer: setGroupsReducer,
    },
    {
        key: "timeOffs",
        reducer: setTimeOffsReducer,
    },
];

export const resetAllState = (dispatch) => {
    [
        resetClassroomReducer,
        resetProfileReducer,
        resetSemesterReducer,
        resetSubjectReducer,
        resetTeacherReducer,
        resetGroupsReducer,
        resetTimeOffsReducer,
        resetSavedTimetableReducer,
    ].forEach((reducer) => {
        dispatch(reducer());
    });

    dispatch(setAccessTokenReducer(null));
};

export const unauthorized = (err, dispatch) => {
    if (err.response.status === 401) {
        dispatch(
            showNotificationReducer({ msg: "Unauthorized", severity: "error" })
        );
        resetAllState(dispatch);
    }
};
