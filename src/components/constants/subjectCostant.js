export const SUBJECT_TABLE_BODY_KEY = [
  "subject_name",
  "subject_code",
  "subject_time_off",
];

export const SUBJECT_TABLE_HEADING = ["Name", "Subject Code", "Timing OFF"];

export const SUBJECT_FORM_FIELDS = [
  {
    label: "Name",
    type: "text",
    key: "subject_name",
    default: "",
  },
  {
    label: "Subject Code",
    type: "text",
    key: "subject_code",
    default: "",
  },
  {
    label: "Timing OFF",
    type: "checkboxes",
    key: "subject_time_off",
    default: 1,
  },
];

export const SUBJECT_DUMMY_DATA = [
  {
    subject_name: "A",
    subject_code: "EC-101",
    subject_time_off: [
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
