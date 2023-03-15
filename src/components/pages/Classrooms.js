import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    CLASSROOM_URL,
    CLASSROOM_FORM_FIELDS,
    CLASSROOM_TABLE_BODY_KEY,
    CLASSROOM_TABLE_HEADING,
    CLASSROOM_FORM_KEY_LIST,
} from "../constants/classroomConstants";
import PageWrapper from "../HOC/PageWrapper";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

import {
    addData,
    deleteData,
    getData,
    updateData,
} from "../redux/actionThunk/apiThunk";
import {
    addClassroomReducer,
    deleteClassroomReducer,
    setClassroomReducer,
    updateClassroomReducer,
} from "../redux/reducers/classroomReducers";

import { clearTimeOffReducer } from "../redux/reducers/commonReducers";

const Classrooms = () => {
    const dispatch = useDispatch();

    const axios = useAxiosPrivate();

    const selectorFunc = useCallback(
        (state) => state.classroom.classroomList,
        []
    );

    const isClassroomsFetched = useSelector(
        (state) => state.classroom.isClassroomsFetched
    );

    useEffect(() => {
        if (isClassroomsFetched) {
            dispatch(getData(axios, CLASSROOM_URL, setClassroomReducer));
        } // eslint-disable-next-line
    }, [isClassroomsFetched]);

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
                    CLASSROOM_URL,
                    updateClassroomReducer,
                    filteredData,
                    CLASSROOM_FORM_KEY_LIST
                )
            );
        } else {
            // create doc
            dispatch(
                addData(
                    axios,
                    CLASSROOM_URL,
                    addClassroomReducer,
                    filteredData,
                    CLASSROOM_FORM_KEY_LIST
                )
            );
        }
        dispatch(clearTimeOffReducer());
    };

    const deleteHandler = (data) => {
        // delete doc
        dispatch(
            deleteData(axios, CLASSROOM_URL, deleteClassroomReducer, data.id)
        );
    };

    return (
        <PageWrapper
            title={"Classrooms"}
            selectorFunc={selectorFunc}
            tableHeadings={CLASSROOM_TABLE_HEADING}
            tableBodykey={CLASSROOM_TABLE_BODY_KEY}
            formFields={CLASSROOM_FORM_FIELDS}
            formSubmitHandler={formSubmitHandler}
            deleteHandler={deleteHandler}
        />
    );
};

export default Classrooms;
