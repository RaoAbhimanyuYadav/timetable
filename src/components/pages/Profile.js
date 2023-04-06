import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";

import PageWrapper from "../HOC/PageWrapper";

import {
    TIMING_TABLE_BODY_KEY,
    TIMING_TABLE_HEADING,
    WORKING_DAY_TABLE_BODY_KEY,
    WORKING_DAY_TABLE_HEADING,
    WORKING_DAY_FORM_FIELDS,
    TIMING_FORM_FIELDS,
    WORKING_DAY_URL,
    BELL_TIMING_URL,
    GROUP_URL,
    GROUP_FORM_FIELDS,
    GROUP_TABLE_HEADING,
    GROUP_TABLE_BODY_KEY,
} from "../constants/profileConstants";

import useAxiosPrivate from "../hooks/useAxiosPrivate";

import {
    addData,
    deleteData,
    getData,
    updateData,
} from "../redux/actionThunk/apiThunk";

import {
    setTimingReducer,
    setWorkingDaysReducer,
} from "../redux/reducers/profileReducer";
import { setGroupsReducer } from "../redux/reducers/groupReducer";

const Profile = () => {
    const dispatch = useDispatch();
    const axios = useAxiosPrivate();

    const isBellTimingsFetched = useSelector(
        (state) => state.profile.isBellTimingsFetched
    );
    const isWorkingDaysFetched = useSelector(
        (state) => state.profile.isWorkingDaysFetched
    );
    const isGroupsFetched = useSelector(
        (state) => state.groups.isGroupsFetched
    );

    const bellTimingSelectorFunc = useCallback(
        (state) => state.profile.bellTimings,
        []
    );
    const workingDaySelectorFunc = useCallback(
        (state) => state.profile.workingDays,
        []
    );
    const groupSelectorFunc = useCallback(
        (state) => state.groups.groupList,
        []
    );

    useEffect(() => {
        if (isBellTimingsFetched) {
            dispatch(getData(axios, BELL_TIMING_URL, setTimingReducer));
        }
        if (isGroupsFetched) {
            dispatch(getData(axios, GROUP_URL, setGroupsReducer));
        }
        if (isWorkingDaysFetched) {
            dispatch(getData(axios, WORKING_DAY_URL, setWorkingDaysReducer));
        } // eslint-disable-next-line
    }, [isWorkingDaysFetched, isBellTimingsFetched]);

    const bellTimingFormSubmitHandler = (e, data) => {
        // Data checking
        const filteredData = {
            name: e.target.name.value,
            start_time: e.target.start_time.value,
            end_time: e.target.end_time.value,
        };
        if (data) {
            filteredData["id"] = data.id;
            // update doc
            dispatch(
                updateData(
                    axios,
                    BELL_TIMING_URL,
                    setTimingReducer,
                    filteredData
                )
            );
        } else {
            // create doc
            dispatch(
                addData(axios, BELL_TIMING_URL, setTimingReducer, filteredData)
            );
        }
    };

    const bellTimingDeleteHandler = (data) => {
        // delete doc
        dispatch(deleteData(axios, BELL_TIMING_URL, setTimingReducer, data.id));
    };
    const groupFormSubmitHandler = (e, data) => {
        // Data checking
        const filteredData = {
            name: e.target.name.value,
            code: e.target.code.value,
        };
        if (data) {
            filteredData["id"] = data.id;
            // update doc
            dispatch(
                updateData(axios, GROUP_URL, setGroupsReducer, filteredData)
            );
        } else {
            // create doc
            dispatch(addData(axios, GROUP_URL, setGroupsReducer, filteredData));
        }
    };

    const groupDeleteHandler = (data) => {
        // delete doc
        dispatch(deleteData(axios, GROUP_URL, setGroupsReducer, data.id));
    };

    const workingDaysFormSubmitHandler = (e, data) => {
        const filteredData = {
            name: e.target.name.value,
            code: e.target.code.value,
        };
        if (data) {
            // update doc
            filteredData["id"] = data.id;
            dispatch(
                updateData(
                    axios,
                    WORKING_DAY_URL,
                    setWorkingDaysReducer,
                    filteredData
                )
            );
        } else {
            // create doc
            dispatch(
                addData(
                    axios,
                    WORKING_DAY_URL,
                    setWorkingDaysReducer,
                    filteredData
                )
            );
        }
    };

    const workingDaysDeleteHandler = (data) => {
        // delete doc
        dispatch(
            deleteData(axios, WORKING_DAY_URL, setWorkingDaysReducer, data.id)
        );
    };

    return (
        <>
            <PageWrapper
                title={"Bell Timings"}
                formFields={TIMING_FORM_FIELDS}
                tableHeadings={TIMING_TABLE_HEADING}
                tableBodykey={TIMING_TABLE_BODY_KEY}
                selectorFunc={bellTimingSelectorFunc}
                formSubmitHandler={bellTimingFormSubmitHandler}
                deleteHandler={bellTimingDeleteHandler}
            />
            <PageWrapper
                title={"Working Days"}
                formFields={WORKING_DAY_FORM_FIELDS}
                tableHeadings={WORKING_DAY_TABLE_HEADING}
                tableBodykey={WORKING_DAY_TABLE_BODY_KEY}
                selectorFunc={workingDaySelectorFunc}
                formSubmitHandler={workingDaysFormSubmitHandler}
                deleteHandler={workingDaysDeleteHandler}
            />
            <PageWrapper
                title={"Groups"}
                formFields={GROUP_FORM_FIELDS}
                tableHeadings={GROUP_TABLE_HEADING}
                tableBodykey={GROUP_TABLE_BODY_KEY}
                selectorFunc={groupSelectorFunc}
                formSubmitHandler={groupFormSubmitHandler}
                deleteHandler={groupDeleteHandler}
            />
        </>
    );
};

export default Profile;
