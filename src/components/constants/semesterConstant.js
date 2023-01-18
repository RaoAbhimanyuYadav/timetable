export const SEMESTER_TABLE_BODY_KEY = [
  "semester_name",
  "semester_code",
  "semester_groups",
  "semester_time_off",
];

export const SEMESTER_TABLE_HEADING = [
  "Name",
  "Semester Code",
  "Total Groups",
  "Timing OFF",
];

export const SEMESTER_FORM_FIELDS = [
  {
    label: "Name",
    type: "text",
    key: "semester_name",
    default: "",
  },
  {
    label: "Semester Code",
    type: "text",
    key: "semester_code",
    default: "",
  },
  {
    label: "Total groups",
    type: "number",
    key: "semester_groups",
    default: 1,
  },
  {
    label: "Timing OFF",
    type: "checkboxes",
    key: "semester_time_off",
    default: 1,
  },
];

export const SEMESTER_DUMMY_DATA = [
  {
    id: "1",
    semester_name: "A",
    semester_code: "EC-101",
    semester_groups: 1,
    semester_time_off: [
      {
        day_id: "abc",
        day: "Monday",
        time_id: "cba",
        time_name: "1",
        time_start: "09:00",
        time_end: "10:00",
      },
      {
        day_id: "abc",
        day: "Monday",
        time_id: "cba",
        time_name: "1",
        time_start: "09:00",
        time_end: "10:00",
      },
    ],
  },
];

export const SEMESTER_COLLECTION_NAME = "semesters";
