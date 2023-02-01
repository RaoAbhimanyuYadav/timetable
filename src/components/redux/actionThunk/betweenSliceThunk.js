import { setLessonAssignmentReducer } from "../reducers/lessonReducer";
import { addToSelectedSemesterReducer } from "../reducers/semesterReducer";

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
