import React, { useState } from "react";
import { CustomButton } from "../utils/customComponents";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { LESSON_URL } from "../constants/lessonConstant";
import { useDispatch, useSelector } from "react-redux";
import {
    setAllLessonsReducer,
    setExtraLessonsReducer,
    setGenratedTimetableReducer,
} from "../redux/reducers/timetableReducer";
import { GeneratorClass, LessonNode } from "../utils/classes";

const serializer = (data) => {
    return JSON.parse(JSON.stringify(data));
};

const GenerateButton = ({ setClassObj }) => {
    const axios = useAxiosPrivate();
    const dispatch = useDispatch();

    const timeSlots = useSelector((state) => state.profile.bellTimings);
    const days = useSelector((state) => state.profile.workingDays);

    const handleGenerate = () => {
        // TODO: Randomize generation
        const getLessons = async () => {
            const resp = await axios.get(LESSON_URL);
            const data = resp.data.data;
            return data;
        };
        getLessons().then((data) => {
            let lsns = data.map((lsn) => new LessonNode(lsn));
            dispatch(setAllLessonsReducer(serializer(lsns)));

            let classObj = new GeneratorClass(timeSlots, days, data);

            let localData = localStorage.getItem("localData");
            let localExtra = localStorage.getItem("extraLessons");

            if (localData === null || localExtra === null) {
                classObj.generateTimeTable();
            } else {
                classObj.assignSavedData(
                    JSON.parse(localData),
                    JSON.parse(localExtra)
                );
            }
            dispatch(
                setExtraLessonsReducer(serializer(classObj.lessonNotAssigned))
            );
            dispatch(
                setGenratedTimetableReducer(
                    serializer(classObj.data.generateFormattedData())
                )
            );
            setClassObj(classObj);
        });
    };

    return <CustomButton onClick={handleGenerate}>Generate</CustomButton>;
};

export default GenerateButton;
