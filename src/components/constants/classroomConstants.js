export const CLASSROOM_TABLE_BODY_KEY = [
  "name",
  "code",
  "classroom_time_off_set",
];

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
    type: "checkboxes",
    key: "classroom_time_off_set",
    default: 1,
  },
];

export const CLASSROOM_DUMMY_DATA = [
  {
    id: "049651ac-7d8b-4fac-85f1-ff17aae11127",
    name: "Ground 1",
    code: "G1",
    classroom_time_off_set: [
      {
        id: "5213a338-e2bc-46ca-898c-9f8075503f18",
        bell_timing: {
          id: "a7d137aa-cad9-44f6-84c9-f15980421820",
          name: "1",
          start_time: "10:00:00",
          end_time: "11:00:00",
        },
        working_day: {
          id: "c2998074-97be-4316-86d7-924c2917225d",
          name: "Wednesday",
          code: "W",
        },
      },
    ],
  },
];

export const CLASSROOM_URL = "classroom/";
