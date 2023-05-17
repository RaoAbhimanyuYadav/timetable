import { useDispatch } from "react-redux";
import { SAVED_TIMETABLE_URL } from "../constants/savedTimtableConstants";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import LoadingSpinner from "../specific/LoadingSpinner";
import {
    CustomButton,
    CustomInputLabel,
    CustomTextField,
} from "../utils/customComponents";
import { showNotificationReducer } from "../redux/reducers/notificationReducer";
import { useState } from "react";

const SaveTimetableForm = ({ onClose, classObj }) => {
    const axios = useAxiosPrivate();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await axios.post(SAVED_TIMETABLE_URL, {
            data: JSON.parse(JSON.stringify(classObj.data)),
            extra_lessons: JSON.parse(JSON.stringify(classObj.extraLessons)),
            name: e.target.name.value,
        });
        setLoading(false);
        dispatch(
            showNotificationReducer({
                msg: "Saved Successfully",
                severity: "success",
            })
        );
        onClose();
    };
    return (
        <>
            <LoadingSpinner open={loading} />
            <form onSubmit={handleSubmit}>
                <CustomInputLabel>Name</CustomInputLabel>
                <CustomTextField
                    margin="normal"
                    required
                    fullWidth
                    type={"text"}
                    name={"name"}
                    defaultValue={""}
                />
                <CustomButton type="submit">Save</CustomButton>
            </form>
        </>
    );
};

export default SaveTimetableForm;
