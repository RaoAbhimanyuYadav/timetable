export const SUBJECT_TABLE_BODY_KEY = ["name", "code", "subject_time_off_set"];

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
        key: "subject_time_off_set",
        default: 1,
    },
];

export const SUBJECT_FORM_KEY_LIST = [
    {
        key: "subject_time_off_set",
        statePath: (getstate) => getstate().common.timeOffList,
    },
];

export const SUBJECT_DUMMY_DATA = [
    {
        id: "7ff426de-c8a7-4bd6-aeb1-b7d58a38e3ce",
        name: "Math",
        code: "EC 101",
        subject_time_off_set: [
            {
                id: "1ab3cb3a-33a0-45cd-a0d8-108258bf0538",
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

export const SUBJECT_URL = "subject/";
