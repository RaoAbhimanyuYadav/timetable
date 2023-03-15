import { Checkbox, Table, TableBody, TableHead, TableRow } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CellWrapper from "../HOC/CellWrapper";
import {
    addTimeOffReducer,
    clearTimeOffReducer,
    removeFromTimeOffReducer,
    setTimeOffReducer,
} from "../redux/reducers/commonReducers";

import React from "react";

const TimeOffCheckbox = ({ day, time }) => {
    const dispatch = useDispatch();

    const timeOff = useSelector((state) =>
        state.common.timeOffList.find(
            (t) => t.working_day.id === day.id && t.bell_timing.id === time.id
        )
    );

    const handleChange = (e, day, time) => {
        const filteredData = {
            bell_timing: time,
            working_day: day,
        };
        if (e.target.checked) {
            // add to timeoff
            dispatch(addTimeOffReducer(filteredData));
        } else {
            // remove from timeoff
            dispatch(removeFromTimeOffReducer(filteredData));
        }
    };

    return (
        <Checkbox
            size="small"
            onChange={(e) => handleChange(e, day, time)}
            checked={timeOff ? true : false}
        />
    );
};

const TimeOff = ({ formData, obj }) => {
    const dispatch = useDispatch();

    const timings = useSelector((state) => state.profile.bellTimings);
    const days = useSelector((state) => state.profile.workingDays);

    useEffect(() => {
        // set timeOff
        if (formData) {
            dispatch(setTimeOffReducer(formData[obj.key]));
        }
        return () => {
            // reset timeoff
            dispatch(clearTimeOffReducer());
        };
    }, [dispatch, formData, obj]);

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <CellWrapper>T/D</CellWrapper>
                    {timings.map((time) => (
                        <CellWrapper key={time.id}>
                            <span>{time.start_time.substr(0, 5)}</span>
                            <span>{time.end_time.substr(0, 5)}</span>
                        </CellWrapper>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {days.map((day) => (
                    <TableRow key={day.id}>
                        <CellWrapper>{day.code} </CellWrapper>
                        {timings.map((time) => (
                            <CellWrapper key={time.id}>
                                <TimeOffCheckbox day={day} time={time} />
                            </CellWrapper>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default TimeOff;
