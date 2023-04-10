import { useDispatch } from "react-redux";

import {
    SEMESTER_URL,
    SEMESTER_FORM_FIELDS,
    SEMESTER_TABLE_BODY_KEY,
    SEMESTER_TABLE_HEADING,
    SEMESTER_FORM_KEY_LIST,
} from "../constants/semesterConstant";

import PageWrapper from "../HOC/PageWrapper";
import { clearTimeOffReducer } from "../redux/reducers/commonReducers";

import { useCallback, useEffect } from "react";
import {
    addData,
    deleteData,
    getData,
    updateData,
} from "../redux/actionThunk/apiThunk";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { setSemesterReducer } from "../redux/reducers/semesterReducer";

const Semesters = () => {
    const dispatch = useDispatch();
    const axios = useAxiosPrivate();

    const selectorFunc = useCallback(
        (state) => state.semester.semesterList,
        []
    );

    useEffect(() => {
        dispatch(getData(axios, SEMESTER_URL, setSemesterReducer));
    }, [dispatch, axios]);

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
                    SEMESTER_URL,
                    setSemesterReducer,
                    filteredData,
                    SEMESTER_FORM_KEY_LIST
                )
            );
        } else {
            // create doc
            dispatch(
                addData(
                    axios,
                    SEMESTER_URL,
                    setSemesterReducer,
                    filteredData,
                    SEMESTER_FORM_KEY_LIST
                )
            );
        }
        dispatch(clearTimeOffReducer());
    };

    const deleteHandler = (data) => {
        // delete doc
        dispatch(deleteData(axios, SEMESTER_URL, setSemesterReducer, data.id));
    };

    return (
        <PageWrapper
            title={"Semesters"}
            selectorFunc={selectorFunc}
            tableHeadings={SEMESTER_TABLE_HEADING}
            tableBodykey={SEMESTER_TABLE_BODY_KEY}
            formFields={SEMESTER_FORM_FIELDS}
            formSubmitHandler={formSubmitHandler}
            deleteHandler={deleteHandler}
        />
    );
};

export default Semesters;
