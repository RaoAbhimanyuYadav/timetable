import { useState } from "react";
import { useSelector } from "react-redux";
import CustomDialog from "../HOC/CustomDialog";
import useFetchAll from "../hooks/useFetchAll";
import LessonAssignmentForm from "../utils/LessonAssignmentForm";

const LessonAssignment = () => {
  const { all } = useFetchAll();

  const teacherData = useSelector((state) => state.teacher);
  const subjectData = useSelector((state) => state.subject);
  const semesterData = useSelector((state) => state.semester);
  const classroomData = useSelector((state) => state.classroom);

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (data) => {
    console.log(data);
    handleClose();
  };
  if (all || !teacherData || !subjectData || !semesterData || !classroomData)
    return <>Loading</>;

  return (
    <>
      <CustomDialog
        title={"Assign Lesson"}
        content={
          <LessonAssignmentForm
            teacherData={teacherData}
            semesterData={semesterData}
            subjectData={subjectData}
            classroomData={classroomData}
            formSubmit={handleSubmit}
          />
        }
        onClose={handleClose}
        open={open}
      />
      <button onClick={() => setOpen((pre) => !pre)}>Click</button>
    </>
  );
};

export default LessonAssignment;
