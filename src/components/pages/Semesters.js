import { useDispatch, useSelector } from "react-redux";

import {
    SEMESTER_URL,
    SEMESTER_FORM_FIELDS,
    SEMESTER_TABLE_BODY_KEY,
    SEMESTER_TABLE_HEADING,
} from "../constants/semesterConstant";

import PageWrapper from "../HOC/PageWrapper";
import {
    clearGroupReducer,
    clearTimeOffReducer,
} from "../redux/reducers/commonReducers";

import { useEffect } from "react";
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

    const timeOffList = useSelector((state) => state.common.timeOffList) || [];
    const groupList = useSelector((state) => state.common.groupList) || [];
    const semesterData = useSelector((state) => state.semester);
    const classroomId = useSelector((state) => state.lesson.classroom);

    useEffect(() => {
        if (semesterData.isSemestersFetched)
            dispatch(getData(axios, SEMESTER_URL, setSemesterReducer));
    }, [semesterData, dispatch, axios]);

    const formSubmitHandler = (e, data) => {
        const filteredData = {
            name: e.target.name.value,
            code: e.target.code.value,
            classroom: { id: classroomId },
            semester_group_set: groupList,
            semester_time_off_set: timeOffList,
        };

        if (data) {
            filteredData["id"] = data.id;
            // update doc
            dispatch(
                updateData(
                    axios,
                    SEMESTER_URL,
                    updateSemesterReducer,
                    filteredData
                )
            );
        } else {
            // create doc
            dispatch(
                addData(axios, SEMESTER_URL, addSemesterReducer, filteredData)
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
            tableBodyData={semesterData?.semesterList || []}
            tableHeadings={SEMESTER_TABLE_HEADING}
            tableBodykey={SEMESTER_TABLE_BODY_KEY}
            formFields={SEMESTER_FORM_FIELDS}
            formSubmitHandler={formSubmitHandler}
            deleteHandler={deleteHandler}
        />
    );
};

export default Semesters;
