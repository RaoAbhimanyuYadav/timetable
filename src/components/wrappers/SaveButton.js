import React from "react";
import { CustomButton } from "../utils/customComponents";
import { useSelector } from "react-redux";

const SaveButton = ({ classObj }) => {
    const extraLessons = useSelector((state) => state.timetable.extraLessons);
    const handleSave = () => {
        localStorage.setItem("localData", JSON.stringify(classObj.data));
        localStorage.setItem("extraLessons", JSON.stringify(extraLessons));
    };
    return <CustomButton onClick={handleSave}>Save</CustomButton>;
};

export default SaveButton;
