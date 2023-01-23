export const TEACHER_TABLE_BODY_KEY = [
  "teacher_name",
  "teacher_code",
  "teacher_color",
  "teacher_time_off",
];

export const TEACHER_TABLE_HEADING = [
  "Name",
  "Nick Name",
  "Color",
  "Timing OFF",
];

export const TEACHER_FORM_FIELDS = [
  {
    label: "Name",
    type: "text",
    key: "teacher_name",
    default: "",
  },
  {
    label: "Nick Name",
    type: "text",
    key: "teacher_code",
    default: "",
  },
  {
    label: "Color",
    type: "color",
    key: "teacher_color",
    default: "#000000",
  },
  {
    label: "Timing OFF",
    type: "checkboxes",
    key: "teacher_time_off",
    default: 1,
  },
];

export const TEACHER_DUMMY_DATA = [
  {
    id: "1",
    teacher_name: "A",
    teacher_code: "EC-101",
    teacher_color: "#12f1f1",
    teacher_time_off: [
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

export const TEACHER_COLLECTION_NAME = "teachers";
