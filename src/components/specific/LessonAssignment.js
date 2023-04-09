import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    LESSON_FORM_FIELDS,
    LESSON_FORM_KEY_LIST,
    LESSON_TABLE_BODY_KEY,
    LESSON_TABLE_HEADING,
    LESSON_URL,
} from "../constants/lessonConstant";

import PageWrapper from "../HOC/PageWrapper";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { addData, deleteData, updateData } from "../redux/actionThunk/apiThunk";
import { setLessonReducer } from "../redux/reducers/lessonReducer";

const LessonAssignment = () => {
    const dispatch = useDispatch();
    const axios = useAxiosPrivate();

    const selectorFunc = useCallback((state) => state.lesson.lessonList, []);
    const teacherId = useSelector((state) => state.lesson.selectedTeacher.id);

    const formSubmitHandler = (e, data) => {
        const filteredData = {
            lesson_per_week: e.target.lesson_per_week.value,
            lesson_length: e.target.lesson_length.value,
        };
        if (data) {
            filteredData["id"] = data.id;
            // update
            dispatch(
                updateData(
                    axios,
                    LESSON_URL,
                    setLessonReducer,
                    filteredData,
                    LESSON_FORM_KEY_LIST,
                    `?id=${teacherId}`
                )
            );
        } else {
            // create
            dispatch(
                addData(
                    axios,
                    LESSON_URL,
                    setLessonReducer,
                    filteredData,
                    LESSON_FORM_KEY_LIST,
                    `?id=${teacherId}`
                )
            );
        }
    };

    const deleteHandler = (data) => {
        dispatch(deleteData(axios, LESSON_URL, setLessonReducer, data.id));
    };

    return (
        <PageWrapper
            title={"Lessons"}
            selectorFunc={selectorFunc}
            tableHeadings={LESSON_TABLE_HEADING}
            tableBodykey={LESSON_TABLE_BODY_KEY}
            formFields={LESSON_FORM_FIELDS}
            formSubmitHandler={formSubmitHandler}
            deleteHandler={deleteHandler}
        />
    );
};

export default LessonAssignment;
