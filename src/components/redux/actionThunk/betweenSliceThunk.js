import { setLessonAssignmentReducer } from "../reducers/lessonReducer";
import { addToSelectedSemesterReducer } from "../reducers/semesterReducer";

export const setLessonAssignment = (id, key) => async (dispatch, getState) => {
    const groupData = [];

    if (key === "semester") {
        id.forEach((s) => {
            if (id !== "")
                groupData.push(
                    getState().semester.semesterList.find(
                        (sem) => sem.id === s.id
                    ).semester_group_set
                );
        });
    }
    dispatch(
        setLessonAssignmentReducer({
            id,
            key,
            groupData,
        })
    );
    if (key === "semester" && id.length === 1 && id[0].id !== "") {
        const sem = getState().semester.semesterList.find(
            (sem) => sem.id === id[0].id
        );
        dispatch(
            setLessonAssignmentReducer({
                id: sem.classroom.id,
                key: "classroom",
            })
        );
    }
};

export const addToSelectedSemester = (id) => async (dispatch, getState) => {
    const data = getState().semester.semesterList.find((sem) => sem.id === id);
    dispatch(addToSelectedSemesterReducer(data));
};
