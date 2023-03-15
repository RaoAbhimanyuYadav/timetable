import { useDispatch, useSelector } from "react-redux";

import {
    SEMESTER_URL,
    SEMESTER_FORM_FIELDS,
    SEMESTER_TABLE_BODY_KEY,
    SEMESTER_TABLE_HEADING,
    SEMESTER_FORM_KEY_LIST,
} from "../constants/semesterConstant";

import PageWrapper from "../HOC/PageWrapper";
import {
    clearGroupReducer,
    clearTimeOffReducer,
} from "../redux/reducers/commonReducers";

import { useCallback, useEffect } from "react";
import {
    addData,
    deleteData,
    getData,
    updateData,
} from "../redux/actionThunk/apiThunk";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import {
    addSemesterReducer,
    deleteSemesterReducer,
    setSemesterReducer,
    updateSemesterReducer,
} from "../redux/reducers/semesterReducer";

const Semesters = () => {
    const dispatch = useDispatch();
    const axios = useAxiosPrivate();

    const selectorFunc = useCallback(
        (state) => state.semester.semesterList,
        []
    );

    const isSemestersFetched = useSelector(
        (state) => state.semester.isSemestersFetched
    );

    useEffect(() => {
        if (isSemestersFetched) {
            dispatch(getData(axios, SEMESTER_URL, setSemesterReducer));
        } // eslint-disable-next-line
    }, [isSemestersFetched]);

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
                    updateSemesterReducer,
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
                    addSemesterReducer,
                    filteredData,
                    SEMESTER_FORM_KEY_LIST
                )
            );
        }
        dispatch(clearTimeOffReducer());
        dispatch(clearGroupReducer());
    };

    const deleteHandler = (data) => {
        // delete doc
        dispatch(
            deleteData(axios, SEMESTER_URL, deleteSemesterReducer, data.id)
        );
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
