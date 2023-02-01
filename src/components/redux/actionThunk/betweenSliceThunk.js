import {
    addLessonReducer,
    deleteLessonReducer,
    setLessonAssignmentReducer,
    updateLessonReducer,
} from "../reducers/lessonReducer";
import { addToSelectedSemesterReducer } from "../reducers/semesterReducer";
import {
    addTeacherLessonReducer,
    deleteTeacherLessonReducer,
    updateTeacherLessonReducer,
} from "../reducers/teacherReducers";

export const setLessonAssignment = (id, key) => async (dispatch, getState) => {
    const groupData =
        key === "semester"
            ? getState().semester.semesterList.find((sem) => sem.id === id)
                  .semester_group_set
            : [];
    dispatch(
        setLessonAssignmentReducer({
            id,
            key,
            groupData,
        })
    );
};

export const addToSelectedSemester = (id) => async (dispatch, getState) => {
    const data = getState().semester.semesterList.find((sem) => sem.id === id);
    dispatch(addToSelectedSemesterReducer(data));
};

export const addLesson = (data) => async (dispatch) => {
    dispatch(addLessonReducer(data));
    console.log(data);
    dispatch(addTeacherLessonReducer(data));
};

export const updateLesson = (data) => async (dispatch) => {
    dispatch(updateLessonReducer(data));
    console.log(data);
    dispatch(updateTeacherLessonReducer(data));
};

export const deleteLesson = (id) => async (dispatch, getState) => {
    dispatch(deleteLessonReducer(id));
    id["teacher"] = getState().lesson.teacher;
    console.log(id);

    dispatch(deleteTeacherLessonReducer(id));
};
