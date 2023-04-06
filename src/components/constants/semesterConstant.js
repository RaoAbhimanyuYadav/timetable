export const SEMESTER_TABLE_BODY_KEY = [
    "name",
    "code",
    "classroom",
    "groups",
    "time_off",
];

export const SEMESTER_TABLE_HEADING = [
    "Name",
    "Semester Code",
    "Classroom",
    "Groups",
    "Timing OFF",
];

export const SEMESTER_FORM_FIELDS = [
    {
        label: "Name",
        type: "text",
        key: "name",
        default: "",
    },
    {
        label: "Semester Code",
        type: "text",
        key: "code",
        default: "",
    },
    {
        label: "Classroom",
        type: "asyncSelect",
        key: "classroom",
        default: "",
        selectorFunc: (state) => state.classroom.classroomList,
    },
    {
        label: "Total groups",
        type: "groups",
        key: "groups",
        default: 1,
    },
    {
        label: "Timing OFF",
        type: "time_off",
        key: "time_off",
        default: 1,
    },
];

export const SEMESTER_FORM_KEY_LIST = [
    {
        key: "groups",
        statePath: (getstate) => getstate().common.groupList,
    },
    {
        key: "classroom",
        createObjWithId: true,
        statePath: (getstate) => getstate().lesson.classroom,
    },
    {
        key: "time_off",
        statePath: (getstate) => getstate().common.timeOffList,
    },
];

export const SEMESTER_DUMMY_DATA = [
    {
        id: "8334eb84-e295-4d55-a8f1-a25f47cad09e",
        time_off: [
            {
                id: "2ee4b56d-c1b7-4fb0-bfb3-a6bc53b7c47d",
                bell_timing: {
                    id: "3dd21780-9d6c-499b-bb58-60659aa48806",
                    name: "1",
                    start_time: "08:00:00",
                    end_time: "09:00:00",
                    c_id: "08:00-09:00",
                },
                working_day: {
                    id: "a64ff210-9089-491f-a977-0a1284fe239d",
                    c_id: "Tuesday-T-",
                    name: "Tuesday",
                    code: "T",
                },
                c_id: "08:00-09:00-Tuesday-T-",
            },
        ],
        groups: [
            {
                id: "54690ee8-461d-43af-98e2-5bb3bea42dfc",
                name: "Group 1",
                code: "G1",
                c_id: "G1-Group 1",
            },
            {
                id: "fac60b34-b69e-4554-932a-b64edccd6b32",
                name: "Whole",
                code: "W",
                c_id: "W-Whole",
            },
        ],
        classroom: {
            id: "915655cb-3098-4bc9-8860-87c07bec60fc",
            time_off: [],
            name: "First Floor",
            code: "F1",
            c_id: "F1-First Floor",
        },
        name: "Second",
        code: "2(A)",
        c_id: "2(A)-Second",
    },
];

export const SEMESTER_URL = "semester/";
