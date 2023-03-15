import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    TEACHER_URL,
    TEACHER_FORM_FIELDS,
    TEACHER_TABLE_BODY_KEY,
    TEACHER_TABLE_HEADING,
    TEACHER_FORM_KEY_LIST,
} from "../constants/teacherConstant";
import PageWrapper from "../HOC/PageWrapper";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import {
    addData,
    deleteData,
    getData,
    updateData,
} from "../redux/actionThunk/apiThunk";

import { clearTimeOffReducer } from "../redux/reducers/commonReducers";
import {
    addTeacherReducer,
    deleteTeacherReducer,
    setTeacherReducer,
    updateTeacherReducer,
} from "../redux/reducers/teacherReducers";

const Teachers = () => {
    const dispatch = useDispatch();
    const axios = useAxiosPrivate();

    const isTeachersFetched = useSelector(
        (state) => state.teacher.isTeachersFetched
    );
    const selectorFunc = useCallback((state) => state.teacher.teacherList, []);

    useEffect(() => {
        if (isTeachersFetched) {
            dispatch(getData(axios, TEACHER_URL, setTeacherReducer));
        } // eslint-disable-next-line
    }, [isTeachersFetched]);

    const formSubmitHandler = (e, data) => {
        const filteredData = {
            name: e.target.name.value,
            code: e.target.code.value,
        };
        if (data) {
            filteredData["id"] = data.id;
            // update doc
            dispatch(
                updateData(
                    axios,
                    TEACHER_URL,
                    updateTeacherReducer,
                    filteredData,
                    TEACHER_FORM_KEY_LIST
                )
            );
        } else {
            // create doc
            dispatch(
                addData(
                    axios,
                    TEACHER_URL,
                    addTeacherReducer,
                    filteredData,
                    TEACHER_FORM_KEY_LIST
                )
            );
        }
        dispatch(clearTimeOffReducer());
    };

    const deleteHandler = (data) => {
        // delete doc
        dispatch(deleteData(axios, TEACHER_URL, deleteTeacherReducer, data.id));
    };

    return (
        <PageWrapper
            title={"Teachers"}
            selectorFunc={selectorFunc}
            tableHeadings={TEACHER_TABLE_HEADING}
            tableBodykey={TEACHER_TABLE_BODY_KEY}
            formFields={TEACHER_FORM_FIELDS}
            formSubmitHandler={formSubmitHandler}
            deleteHandler={deleteHandler}
        />
    );
};

export default Teachers;
