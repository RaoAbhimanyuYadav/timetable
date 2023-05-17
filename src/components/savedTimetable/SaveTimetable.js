import { CustomButton } from "../utils/customComponents";
import { showNotificationReducer } from "../redux/reducers/notificationReducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import CustomDialog from "../HOC/CustomDialog";
import SaveTimetableForm from "./SaveTimetableForm";
import { Grid } from "@mui/material";

const SaveTimetable = ({ classObj }) => {
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false);

    const handleSave = (type) => {
        if (classObj) {
            if (type === "PERMANENT") {
                setOpen(true);
            } else {
                localStorage.setItem(
                    "localData",
                    JSON.stringify(classObj.data)
                );
                localStorage.setItem(
                    "extraLessons",
                    JSON.stringify(classObj.extraLessons)
                );
                dispatch(
                    showNotificationReducer({
                        msg: "Saved Successfully",
                        severity: "success",
                    })
                );
            }
        } else {
            dispatch(
                showNotificationReducer({
                    msg: "Please Generate timetable first.",
                    severity: "error",
                })
            );
        }
    };

    return (
        <>
            <Grid item>
                <CustomButton onClick={() => handleSave("LOCAL")}>
                    Save Locally
                </CustomButton>
            </Grid>
            <Grid item>
                <CustomDialog
                    title={`Save Timetable`}
                    content={
                        <SaveTimetableForm
                            onClose={handleClose}
                            classObj={classObj}
                        />
                    }
                    open={open}
                    onClose={handleClose}
                    maxWidth={"xs"}
                />
                <CustomButton onClick={() => handleSave("PERMANENT")}>
                    Save Permanent
                </CustomButton>
            </Grid>
        </>
    );
};

export default SaveTimetable;
