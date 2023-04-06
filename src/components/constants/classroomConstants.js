export const CLASSROOM_TABLE_BODY_KEY = ["name", "code", "time_off"];

export const CLASSROOM_TABLE_HEADING = ["Name", "Code", "Timing OFF"];

export const CLASSROOM_FORM_FIELDS = [
    {
        label: "Name",
        type: "text",
        key: "name",
        default: "",
    },
    {
        label: "Classroom Code",
        type: "text",
        key: "code",
        default: "",
    },
    {
        label: "Timing OFF",
        type: "time_off",
        key: "time_off",
        default: 1,
    },
];

export const CLASSROOM_FORM_KEY_LIST = [
    {
        key: "time_off",
        statePath: (getstate) => getstate().common.timeOffList,
    },
];

export const CLASSROOM_DUMMY_DATA = [
    {
        id: "915655cb-3098-4bc9-8860-87c07bec60fc",
        time_off: [
            {
                id: "e89e2ee5-d897-4b6f-b1b6-4270fe3521d7",
                bell_timing: {
                    id: "8896248c-1dba-4677-aa87-942a1bd4b017",
                    name: "2",
                    start_time: "09:00:00",
                    end_time: "10:00:00",
                    c_id: "09:00-10:00",
                },
                working_day: {
                    id: "e42ed725-16da-4d71-943c-071b9e47bfc3",
                    c_id: "Monday-M-",
                    name: "Monday",
                    code: "M",
                },
                c_id: "09:00-10:00-Monday-M-",
            },
        ],
        name: "First Floor",
        code: "F1",
        c_id: "F1-First Floor",
    },
];

export const CLASSROOM_URL = "classroom/";
