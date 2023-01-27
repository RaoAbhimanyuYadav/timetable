export const LESSON_TABLE_BODY_KEY = [
    "teacher",
    "subject",
    "classroom",
    "semester",
    "semester_group",
    "lesson_per_week",
    "is_lab",
];

export const LESSON_TABLE_HEADING = [
    "Teacher",
    "Subject",
    "Classroom",
    "Semester",
    "Group",
    "Lesson per week",
    "Is Lab",
];

export const LESSON_FORM_FIELDS = [
    {
        label: "Teacher",
        type: "asyncSelect",
        key: "teacher",
        default: "",
        listName: "teacherList",
    },
    {
        label: "Subject",
        type: "asyncSelect",
        key: "subject",
        default: "",
        listName: "subjectList",
    },
    {
        label: "Classroom",
        type: "asyncSelect",
        key: "classroom",
        default: "",
        listName: "classroomList",
    },
    {
        label: "Semester",
        type: "asyncSelect",
        key: "semester",
        default: "",
        listName: "semesterList",
    },
    {
        label: "Group",
        type: "asyncSelect",
        key: "semester_group",
        default: "",
        listName: "groupList",
    },
    {
        label: "Lesson per week",
        type: "number",
        key: "lesson_per_week",
        default: 1,
    },
    {
        label: "Is Lab",
        type: "checkbox",
        key: "is_lab",
        default: false,
    },
];

export const LESSON_DUMMY_DATA = [
    {
        id: "d348c0b6-b51e-4960-899f-f939f0cbf00f",
        teacher: {
            id: "d7e857e3-df17-4a8c-a021-0108eb56300b",
            name: "Amish",
            code: "AH",
            color: "#1136ca",
            teacher_time_off_set: [
                {
                    id: "7af3882d-3a25-4664-a115-83839a0063a4",
                    bell_timing: {
                        id: "a7d137aa-cad9-44f6-84c9-f15980421820",
                        name: "1",
                        start_time: "10:00:00",
                        end_time: "11:00:00",
                    },
                    working_day: {
                        id: "9443ed23-d521-47de-b428-0371e3972d72",
                        name: "Monday",
                        code: "M",
                    },
                },
            ],
        },
        classroom: {
            id: "6f25eea6-d083-4421-b0c6-8dd3f41bc61d",
            name: "Ground 2",
            code: "G2",
            classroom_time_off_set: [
                {
                    id: "893ff982-869b-4d68-9186-60a800a92b58",
                    bell_timing: {
                        id: "a7d137aa-cad9-44f6-84c9-f15980421820",
                        name: "1",
                        start_time: "10:00:00",
                        end_time: "11:00:00",
                    },
                    working_day: {
                        id: "9443ed23-d521-47de-b428-0371e3972d72",
                        name: "Monday",
                        code: "M",
                    },
                },
                {
                    id: "06a4969b-6f6f-4185-b44a-dd558c8dc7eb",
                    bell_timing: {
                        id: "a7d137aa-cad9-44f6-84c9-f15980421820",
                        name: "1",
                        start_time: "10:00:00",
                        end_time: "11:00:00",
                    },
                    working_day: {
                        id: "c096f861-a6e8-4a24-811f-6e8c1dc88b81",
                        name: "Thrusday",
                        code: "Th",
                    },
                },
            ],
        },
        subject: {
            id: "a57e8bca-66fd-4e02-a572-32f15e933ef5",
            name: "English",
            code: "EC-105",
            subject_time_off_set: [
                {
                    id: "64df82ab-e4fb-46ef-a50b-06e930f7dffc",
                    bell_timing: {
                        id: "a7d137aa-cad9-44f6-84c9-f15980421820",
                        name: "1",
                        start_time: "10:00:00",
                        end_time: "11:00:00",
                    },
                    working_day: {
                        id: "9443ed23-d521-47de-b428-0371e3972d72",
                        name: "Monday",
                        code: "M",
                    },
                },
            ],
        },
        semester: {
            id: "1f57483d-5d5f-48fd-b7fe-3ff52b092573",
            name: "2",
            code: "2",
            semester_time_off_set: [],
            semester_group_set: [
                {
                    id: "8181edb3-1a05-4a26-92c0-f3e87be44d98",
                    name: "Whole",
                    code: "W",
                },
                {
                    id: "c6533cec-36dc-4721-a3c1-18ff6f6f1afa",
                    name: "Group 1",
                    code: "G1",
                },
            ],
        },
        semester_group: {
            id: "c6533cec-36dc-4721-a3c1-18ff6f6f1afa",
            name: "Group 1",
            code: "G1",
        },
        lesson_per_week: 4,
        is_lab: true,
    },
];

export const LESSON_URL = "lesson/";
