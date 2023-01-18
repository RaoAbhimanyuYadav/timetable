export const CLASSROOM_TABLE_BODY_KEY = [
  "classroom_name",
  "classroom_code",
  "classroom_time_off",
];

export const CLASSROOM_TABLE_HEADING = ["Name", "Classroom Code", "Timing OFF"];

export const CLASSROOM_FORM_FIELDS = [
  {
    label: "Name",
    type: "text",
    key: "classroom_name",
    default: "",
  },
  {
    label: "Classroom Code",
    type: "text",
    key: "classroom_code",
    default: "",
  },
  {
    label: "Timing OFF",
    type: "checkboxes",
    key: "classroom_time_off",
    default: 1,
  },
];

export const CLASSROOM_DUMMY_DATA = [
  {
    id: "1",
    classroom_name: "A",
    classroom_code: "EC-101",
    classroom_time_off: [
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

export const CLASSROOM_COLLECTION_NAME = "classrooms";
