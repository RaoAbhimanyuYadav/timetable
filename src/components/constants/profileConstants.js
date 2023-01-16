export const TIMING_TABLE_HEADING = ["Name", "Start Time", "End Time"];

export const TIMING_TABLE_BODY_KEY = ["name", "start_time", "end_time"];

export const WORKING_DAY_TABLE_HEADING = ["Name"];

export const WORKING_DAY_TABLE_BODY_KEY = ["name"];

export const DUMMY_DATA = {
  nameOfOrganisation: "Abhimanyu",
  academicYear: "2022-23",
  bellTimings: [
    {
      id: "1",
      name: "1",
      start_time: "09:00",
      end_time: "10:00",
    },
    {
      id: "2",
      name: "2",
      start_time: "10:00",
      end_time: "11:00",
    },
  ],
  workingDays: [
    { id: "1", name: "monday" },
    { id: "2", name: "tuesday" },
  ],
};

export const WORKING_DAY_FORM_FIELDS = [
  {
    label: "Name",
    type: "select",
    key: "name",
    default: "Monday",
    options: [
      {
        label: "Monday",
        value: "Monday",
      },
      {
        label: "Tuesday",
        value: "Tuesday",
      },
      {
        label: "Wednesday",
        value: "Wednesday",
      },
      {
        label: "Thrusday",
        value: "Thrusday",
      },
      {
        label: "Friday",
        value: "Friday",
      },
      {
        label: "Saturday",
        value: "Saturday",
      },
    ],
  },
];
export const TIMING_FORM_FIELDS = [
  {
    label: "Name",
    type: "text",
    key: "name",
    default: "",
  },
  {
    label: "Start Time",
    type: "time",
    key: "start_time",
    default: "10:00",
  },
  {
    label: "End Time",
    type: "time",
    key: "end_time",
    default: "11:00",
  },
];

export const timingCollectionName = "timings";

export const workingDayCollectionName = "working_days";
