export const TEACHER_TABLE_BODY_KEY = [
    "name",
    "code",
    "color",
    "time_off",
    "assign_lesson_button",
];

export const TEACHER_TABLE_HEADING = [
    "Name",
    "Nick Name",
    "Color",
    "Timing OFF",
    "Assign Lessons",
];

export const TEACHER_FORM_FIELDS = [
    {
        label: "Name",
        type: "text",
        key: "name",
        default: "",
    },
    {
        label: "Nick Name",
        type: "text",
        key: "code",
        default: "",
    },
    {
        label: "Color",
        type: "color",
        key: "color",
        default: "#000000",
    },
    {
        label: "Timing OFF",
        type: "time_off",
        key: "time_off",
        default: 1,
    },
];

export const TEACHER_FORM_KEY_LIST = [
    {
        key: "color",
        statePath: (getstate) => getstate().common.selectedColor,
    },
    {
        key: "time_off",
        statePath: (getstate) => getstate().common.timeOffList,
    },
];

export const TEACHER_DUMMY_DATA = [
    {
        id: "cdb3de5f-fe9d-4184-8c78-2ca1c7ce81f0",
        time_off: [
            {
                id: "c76b5661-79cb-46d2-b929-2e3d29586b0d",
                bell_timing: {
                    id: "8896248c-1dba-4677-aa87-942a1bd4b017",
                    name: "2",
                    start_time: "09:00:00",
                    end_time: "10:00:00",
                    c_id: "09:00-10:00",
                },
                working_day: {
                    id: "a64ff210-9089-491f-a977-0a1284fe239d",
                    c_id: "Tuesday-T-",
                    name: "Tuesday",
                    code: "T",
                },
                c_id: "09:00-10:00-Tuesday-T-",
            },
        ],
        name: "Saurabh",
        code: "SKU",
        color: "#121212",
        c_id: "SKU-Saurabh-#121212",
    },
];

export const TEACHER_URL = "teacher/";
