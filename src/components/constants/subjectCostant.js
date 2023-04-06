export const SUBJECT_TABLE_BODY_KEY = ["name", "code", "time_off"];

export const SUBJECT_TABLE_HEADING = ["Name", "Subject Code", "Timing OFF"];

export const SUBJECT_FORM_FIELDS = [
    {
        label: "Name",
        type: "text",
        key: "name",
        default: "",
    },
    {
        label: "Subject Code",
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

export const SUBJECT_FORM_KEY_LIST = [
    {
        key: "time_off",
        statePath: (getstate) => getstate().common.timeOffList,
    },
];

export const SUBJECT_DUMMY_DATA = [
    {
        id: "c4b7bc42-1a33-469a-b4b0-e4bf878e4117",
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
        name: "Anteena",
        code: "EC-101",
        c_id: "EC-101-Anteena",
    },
];

export const SUBJECT_URL = "subject/";
