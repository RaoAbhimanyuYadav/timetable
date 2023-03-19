import React, { useState } from "react";
import { useDispatch } from "react-redux";
import CustomDialog from "../HOC/CustomDialog";
import {
    resetLessonReducer,
    setLessonAssignmentReducer,
    setLessonReducer,
} from "../redux/reducers/lessonReducer";
import { CustomButton } from "../utils/customComponents";
import LessonAssignment from "./LessonAssignment";

const LessonAssignButton = ({ teacher }) => {
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
        dispatch(resetLessonReducer());
        dispatch(setLessonAssignmentReducer({ key: "teacherId", id: "" }));
    };

    const handleClick = () => {
        dispatch(
            setLessonAssignmentReducer({ key: "teacherId", id: teacher.id })
        );
        dispatch(setLessonReducer(teacher ? teacher?.lesson_set : []));
        setOpen(true);
    };

    const content = (
        <>
            <LessonAssignment lessons={teacher.lesson_set} />
        </>
    );

    return (
        <>
            <CustomDialog
                title={`Assign Lecture to ${teacher.name}`}
                content={content}
                open={open}
                onClose={handleClose}
                maxWidth={"lg"}
            />
            <CustomButton onClick={handleClick}>Assign Lesson</CustomButton>
        </>
    );
};

export default LessonAssignButton;
