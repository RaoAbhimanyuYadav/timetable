export const SEMESTER_TABLE_BODY_KEY = [
  "name",
  "code",
  "semester_group_set",
  "semester_time_off_set",
];

export const SEMESTER_TABLE_HEADING = [
  "Name",
  "Semester Code",
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
    label: "Total groups",
    type: "groups",
    key: "semester_group_set",
    default: 1,
  },
  {
    label: "Timing OFF",
    type: "checkboxes",
    key: "semester_time_off_set",
    default: 1,
  },
];

export const SEMESTER_DUMMY_DATA = [
  {
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
    ],
  },
];

export const SEMESTER_URL = "semester/";
