import { useEffect, useState } from "react";
import { CustomButton } from "../utils/customComponents";
import CustomDialog from "../HOC/CustomDialog";
import SavedTimetableUI from "./SavedTimetableUI";
import { useSelector } from "react-redux";

const AllSavedTimetable = () => {
    const [open, setOpen] = useState(false);
    const selectedSavedTimetableId = useSelector(
        (state) => state.savedTimetable.selectedSavedTimetableId
    );

    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (selectedSavedTimetableId) {
            setOpen(false);
        }
    }, [selectedSavedTimetableId]);

    return (
        <>
            <CustomDialog
                title={`Saved Timetables`}
                content={<SavedTimetableUI />}
                open={open}
                onClose={handleClose}
                maxWidth={"lg"}
            />
            <CustomButton onClick={handleClick}>
                Select Saved Timetable
            </CustomButton>
        </>
    );
};

export default AllSavedTimetable;
