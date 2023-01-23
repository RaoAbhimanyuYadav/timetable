import { Box } from "@mui/material";
import { useEffect, useState } from "react";

import {
  CustomButton,
  CustomInputLabel,
  CustomMenuItem,
  CustomTextField,
} from "../utils/customComponents";

const CLASS_TYPE_OPTIONS = [
  {
    label: "Normal lecture",
    value: "0",
  },
  {
    label: "Lab",
    value: "1",
  },
];

const LessonAssignmentForm = ({
  formSubmit,
  teacherData,
  semesterData,
  subjectData,
  classroomData,
}) => {
  const [groups, setGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState("");

  useEffect(() => {
    if (semesterData.semesterList[0]?.id) {
      setGroups(semesterData?.semesterList[0]?.semester_groups || []);
      setSelectedGroupId("1");
    }
  }, [semesterData]);

  const SELECT_FORM_INFO = [
    {
      id: "teacher",
      label: "teacher",
      name: "teacher",
      default: teacherData.teacherList[0]?.id || "",
      data: teacherData.teacherList,
      extractor: (option) => `${option.teacher_name}`,
    },
    {
      id: "subject",
      label: "subject",
      name: "subject",
      default: subjectData.subjectList[0]?.id || "",
      data: subjectData.subjectList,
      extractor: (option) => `${option.subject_code}`,
    },
    {
      id: "semester",
      label: "semester",
      name: "semester",
      default: semesterData.semesterList[0]?.id || "",
      data: semesterData.semesterList,
      extractor: (option) => `${option.semester_name}`,
    },

    {
      id: "classroom",
      label: "classroom",
      name: "classroom",
      default: classroomData.classroomList[0]?.id || "",
      data: classroomData.classroomList,
      extractor: (option) => `${option.classroom_name}`,
    },
  ];

  const dataExtractor = (id, list) => {
    const index = list.findIndex((instance) => instance.id === id);
    return list[index];
  };

  const handleChange = (e, name) => {
    if (name === "semester") {
      setGroups(
        dataExtractor(e.target.value, semesterData.semesterList).semester_groups
      );
      setSelectedGroupId("1");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredData = {
      teacher: dataExtractor(e.target.teacher.value, teacherData.teacherList),
      semester: dataExtractor(
        e.target.semester.value,
        semesterData.semesterList
      ),
      subject: dataExtractor(e.target.subject.value, subjectData.subjectList),
      classroom: dataExtractor(
        e.target.classroom.value,
        classroomData.classroomList
      ),
      group: dataExtractor(selectedGroupId, groups),
      classType: e.target.classType.value,
    };
    formSubmit(filteredData);
    setGroups(semesterData?.semesterList[0]?.semester_groups || []);
    setSelectedGroupId("1");
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      {SELECT_FORM_INFO.map((field) => (
        <Box key={field.id}>
          <CustomInputLabel>{field.label}</CustomInputLabel>
          <CustomTextField
            select
            id={field.id}
            name={field.name}
            defaultValue={field.default}
            onChange={(e) => handleChange(e, field.name)}
          >
            {field.data.map((option) => (
              <CustomMenuItem key={option.id} value={option.id}>
                {field.extractor(option)}
              </CustomMenuItem>
            ))}
          </CustomTextField>
        </Box>
      ))}
      <CustomInputLabel>Select Group</CustomInputLabel>
      <CustomTextField
        select
        id={"group"}
        name={"group"}
        value={selectedGroupId}
        onChange={(e) => setSelectedGroupId(e.target.value)}
      >
        {groups.map((option) => (
          <CustomMenuItem key={option.id} value={option.id}>
            {`${option.group_name}`}
          </CustomMenuItem>
        ))}
      </CustomTextField>
      <CustomInputLabel>Select Class Type</CustomInputLabel>
      <CustomTextField
        select
        id={"classType"}
        name={"classType"}
        defaultValue={"0"}
      >
        {CLASS_TYPE_OPTIONS.map((option) => (
          <CustomMenuItem key={option.value} value={option.value}>
            {option.label}
          </CustomMenuItem>
        ))}
      </CustomTextField>
      <CustomInputLabel>Lessons per week</CustomInputLabel>
      <CustomTextField
        type="number"
        key="lessons_per_week"
        name="lessonsPerWeek"
        defaultValue={1}
      />
      <br />
      <CustomButton type="submit">Save</CustomButton>
    </form>
  );
};

export default LessonAssignmentForm;
