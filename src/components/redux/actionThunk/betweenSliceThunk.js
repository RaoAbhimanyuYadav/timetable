import { setLessonAssignmentReducer } from "../reducers/lessonReducer";

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
