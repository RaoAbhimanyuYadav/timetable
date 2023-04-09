import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { LESSON_URL } from "../constants/lessonConstant";
import CustomDialog from "../HOC/CustomDialog";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { getDataWithId } from "../redux/actionThunk/apiThunk";
import {
    resetLessonReducer,
    resetSelectedTeacherReducer,
    setLessonReducer,
    setSelectedTeacherReducer,
} from "../redux/reducers/lessonReducer";
import { CustomButton } from "../utils/customComponents";
import LessonAssignment from "./LessonAssignment";

const LessonAssignButton = ({ teacher }) => {
    const dispatch = useDispatch();
    const axios = useAxiosPrivate();

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
        dispatch(resetLessonReducer());
        dispatch(resetSelectedTeacherReducer());
    };

    const handleClick = () => {
        dispatch(setSelectedTeacherReducer(teacher));
        dispatch(
            getDataWithId(axios, LESSON_URL, setLessonReducer, teacher.id)
        );
        setOpen(true);
    };

    return (
        <>
            <CustomDialog
                title={`Assign Lecture to ${teacher.name}`}
                content={<LessonAssignment />}
                open={open}
                onClose={handleClose}
                maxWidth={"lg"}
            />
            <CustomButton onClick={handleClick}>Assign Lesson</CustomButton>
        </>
    );
};

export default LessonAssignButton;
