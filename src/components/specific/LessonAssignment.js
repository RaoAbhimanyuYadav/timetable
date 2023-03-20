import { useCallback } from "react";
import { useDispatch } from "react-redux";
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
import {
    addLessonReducer,
    deleteLessonReducer,
    updateLessonReducer,
} from "../redux/reducers/lessonReducer";

const LessonAssignment = () => {
    const dispatch = useDispatch();
    const axios = useAxiosPrivate();

    const selectorFunc = useCallback((state) => state.lesson.lessonList, []);

    const formSubmitHandler = (e, data) => {
        const filteredData = {
            lesson_per_week: e.target.lesson_per_week.value,
            is_lab: e.target.is_lab.value,
        };
        if (data) {
            filteredData["id"] = data.id;
            // update
            dispatch(
                updateData(
                    axios,
                    LESSON_URL,
                    updateLessonReducer,
                    filteredData,
                    LESSON_FORM_KEY_LIST
                )
            );
        } else {
            // create
            dispatch(
                addData(
                    axios,
                    LESSON_URL,
                    addLessonReducer,
                    filteredData,
                    LESSON_FORM_KEY_LIST
                )
            );
        }
    };

    const deleteHandler = (data) => {
        dispatch(deleteData(axios, LESSON_URL, deleteLessonReducer, data.id));
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
