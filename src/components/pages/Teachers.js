import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    TEACHER_URL,
    TEACHER_FORM_FIELDS,
    TEACHER_TABLE_BODY_KEY,
    TEACHER_TABLE_HEADING,
} from "../constants/teacherConstant";
import PageWrapper from "../HOC/PageWrapper";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useFetchAll from "../hooks/useFetchAll";
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

    const { isLoading } = useFetchAll();

    const teacherData = useSelector((state) => state.teacher);
    const timeOffList = useSelector((state) => state.common.timeOffList) || [];
    const selectedColor =
        useSelector((state) => state.common.selectedColor) || [];

    useEffect(() => {
        if (!teacherData.isTeachersFetched)
            dispatch(getData(axios, TEACHER_URL, setTeacherReducer));
    }, [teacherData, dispatch, axios]);

    const formSubmitHandler = (e, data) => {
        const filteredData = {
            name: e.target.name.value,
            code: e.target.code.value,
            color: selectedColor,
            teacher_time_off_set: timeOffList,
        };
        if (data) {
            filteredData["id"] = data.id;
            // update doc
            dispatch(
                updateData(
                    axios,
                    TEACHER_URL,
                    updateTeacherReducer,
                    filteredData
                )
            );
        } else {
            // create doc
            dispatch(
                addData(axios, TEACHER_URL, addTeacherReducer, filteredData)
            );
        }
        dispatch(clearTimeOffReducer());
    };

    const deleteHandler = (data) => {
        // delete doc
        dispatch(deleteData(axios, TEACHER_URL, deleteTeacherReducer, data.id));
    };

    if (isLoading) return <>Loading</>;

    return (
        <PageWrapper
            title={"Teachers"}
            tableBodyData={teacherData.teacherList || []}
            tableHeadings={TEACHER_TABLE_HEADING}
            tableBodykey={TEACHER_TABLE_BODY_KEY}
            formFields={TEACHER_FORM_FIELDS}
            formSubmitHandler={formSubmitHandler}
            deleteHandler={deleteHandler}
        />
    );
};

export default Teachers;
