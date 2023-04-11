import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { GeneratorClass } from "../utils/classes";

const ObjCreator = ({ setClassObj }) => {
    const lessons = useSelector((state) => state.timetable.allLessons);
    const timeSlots = useSelector((state) => state.profile.bellTimings);
    const days = useSelector((state) => state.profile.workingDays);
    const storedObj = useSelector((state) => state.timetable.objData);
    const extraLessons = useSelector((state) => state.timetable.extraLessons);

    useEffect(() => {
        let classObj = new GeneratorClass(timeSlots, days, lessons);
        if (storedObj && extraLessons) {
            classObj.assignSavedData(storedObj, extraLessons);
        } else {
            classObj.generateTimeTable();
        }
        setClassObj(classObj);
    }, []);

    return <></>;
};

export default ObjCreator;
