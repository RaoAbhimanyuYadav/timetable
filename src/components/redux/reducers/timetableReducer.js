import { createSlice } from "@reduxjs/toolkit";
import { AllotedSlotNode } from "../../utils/classes";

const initialState = {
    extraLessons: [],
    generatedTimetable: {},
    selectedLesson: undefined,
    allLessons: [],
    objData: undefined,
};

const timetableSlice = createSlice({
    name: "timetable",
    initialState,
    reducers: {
        setExtraLessonsReducer: (state, action) => {
            state.extraLessons = action.payload;
        },
        setGenratedTimetableReducer: (state, action) => {
            state.generatedTimetable = action.payload;
        },
        setSelectedLessonReducer: (state, action) => {
            state.selectedLesson = action.payload;
        },
        setAllLessonsReducer: (state, action) => {
            state.allLessons = action.payload;
        },
        setObjDataReducer: (state, action) => {
            state.objData = action.payload;
        },
        cutLessonReducer: (state, action) => {
            const { lsn, dayId, timeId } = action.payload;
            lsn.sem_grps.forEach((semGrp) => {
                state.generatedTimetable[semGrp.semester.id][dayId][timeId] =
                    state.generatedTimetable[semGrp.semester.id][dayId][
                        timeId
                    ].filter(
                        (allotedNode) =>
                            allotedNode.group.id !== semGrp.group.id
                    );
            });

            let lsnFound = 0;
            let newData = state.extraLessons.map((lesson) => {
                if (lesson.id === lsn.id) {
                    lsnFound = 1;
                    let newLsn = { ...lesson };
                    newLsn.lesson_per_week = lesson.lesson_per_week + 1;
                    return newLsn;
                }
                return lesson;
            });
            if (!lsnFound) {
                newData.push(lsn);
            }
            state.extraLessons = newData;
        },
        pasteLessonReducer: (state, action) => {
            const { dayId, timeId } = action.payload;
            // decrease lesson_per_week if 0 then remove
            state.extraLessons = state.extraLessons
                .map((lesson) => {
                    if (lesson.id === state.selectedLesson.id) {
                        let newLsn = { ...lesson };
                        newLsn.lesson_per_week = lesson.lesson_per_week - 1;
                        if (newLsn.lesson_per_week === 0) return null;
                        return newLsn;
                    }
                    return lesson;
                })
                .filter((lesson) => lesson !== null);

            // add in generated timetable
            let pre = state.generatedTimetable;
            state.selectedLesson.sem_grps.forEach((semGrp) => {
                let slot = JSON.parse(
                    JSON.stringify(
                        new AllotedSlotNode(state.selectedLesson, 0, semGrp)
                    )
                );
                let semId = semGrp.semester.id;

                if (!(semId in pre)) pre[semId] = {};
                if (!(dayId in pre[semId])) pre[semId][dayId] = {};
                if (!(timeId in pre[semId][dayId]))
                    pre[semId][dayId][timeId] = [];

                pre[semId][dayId][timeId] = [
                    ...pre[semId][dayId][timeId],
                    slot,
                ];
            });

            state.selectedLesson = undefined;
        },
    },
});

export const {
    setExtraLessonsReducer,
    setGenratedTimetableReducer,
    setSelectedLessonReducer,
    setAllLessonsReducer,
    cutLessonReducer,
    pasteLessonReducer,
    setObjDataReducer,
} = timetableSlice.actions;

export default timetableSlice.reducer;
