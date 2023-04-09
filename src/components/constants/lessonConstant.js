import { setSelectedClassroomReducer } from "../redux/reducers/classroomReducers";
import { setSelectedSubjectReducer } from "../redux/reducers/subjectReducer";
import {
    deleteInSelectedTeachersListReducer,
    pushInSelectedTeachersListReducer,
    resetSelectedTeachersListReducer,
    setSelectedTeachersListReducer,
    updateInSelectedTeachersListReducer,
} from "../redux/reducers/teacherReducers";

export const LESSON_TABLE_BODY_KEY = [
    // "teacher",
    "subject",
    "classroom",
    "sem_grps",
    "lesson_per_week",
    "lesson_length",
];

export const LESSON_TABLE_HEADING = [
    // "Teacher",
    "Subject",
    "Classroom",
    "Semester & group",
    "Lesson per week",
    "Lesson Duration",
];

export const LESSON_FORM_FIELDS = [
    {
        label: "Teacher",
        type: "multipleSelector",
        key: "teachers",
        default: [
            {
                id: "",
            },
        ],
        selectorFunc: (state) => state.teacher.teacherList,
        selectedDataFunc: (state) => state.teacher.selectedTeachersList,
        setReducer: setSelectedTeachersListReducer,
        pushReducer: pushInSelectedTeachersListReducer,
        deleteReducer: deleteInSelectedTeachersListReducer,
        resetReducer: resetSelectedTeachersListReducer,
        updateReducer: updateInSelectedTeachersListReducer,
    },
    {
        label: "Subject",
        type: "asyncSelect",
        key: "subject",
        default: "",
        selectorFunc: (state) => state.subject.subjectList,
        selectedDataFunc: (state) => state.subject.selectedSubject,
        setReducer: setSelectedSubjectReducer,
    },
    {
        label: "Semester & Group",
        type: "semGrpSelector",
        key: "sem_grps",
        default: [{ semester: { id: "" }, group: { id: "" } }],
    },
    {
        label: "Classroom",
        type: "asyncSelect",
        key: "classroom",
        default: "",
        selectorFunc: (state) => state.classroom.classroomList,
        selectedDataFunc: (state) => state.classroom.selectedClassroom,
        setReducer: setSelectedClassroomReducer,
    },
    {
        label: "Lesson per week",
        type: "number",
        key: "lesson_per_week",
        default: 1,
    },
    {
        label: "Lesson Duration",
        type: "number",
        key: "lesson_length",
        default: 1,
    },
];

export const LESSON_FORM_KEY_LIST = [
    {
        key: "teachers",
        statePath: (getstate) => getstate().teacher.selectedTeachersList,
    },
    {
        key: "classroom",
        statePath: (getstate) => getstate().classroom.selectedClassroom,
    },
    {
        key: "subject",
        statePath: (getstate) => getstate().subject.selectedSubject,
    },
    {
        key: "sem_grps",
        statePath: (getstate) => getstate().semester.selectedSemGrps,
    },
];

export const LESSON_URL = "lesson/";
