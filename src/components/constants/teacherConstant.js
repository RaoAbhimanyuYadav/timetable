export const TEACHER_TABLE_BODY_KEY = [
    "name",
    "code",
    "color",
    "teacher_time_off_set",
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
        key: "teacher_time_off_set",
        default: 1,
    },
];

export const TEACHER_FORM_KEY_LIST = [
    {
        key: "color",
        statePath: (getstate) => getstate().common.selectedColor,
    },
    {
        key: "teacher_time_off_set",
        statePath: (getstate) => getstate().common.timeOffList,
    },
];

export const TEACHER_DUMMY_DATA = [
    {
        id: "7e3b2ae8-e606-40a9-8bf5-3f763105e157",
        name: "Rahul",
        code: "RL",
        color: "#ff2312",
        teacher_time_off_set: [
            {
                id: "b12b7c32-4382-4a17-99d2-d601df11a416",
                bell_timing: {
                    id: "a7d137aa-cad9-44f6-84c9-f15980421820",
                    name: "1",
                    start_time: "10:00:00",
                    end_time: "11:00:00",
                },
                working_day: {
                    id: "c0fbc54f-c73f-484c-a992-df41230b5a00",
                    name: "Tuesday",
                    code: "T",
                },
            },
        ],
    },
];

export const TEACHER_URL = "teacher/";
