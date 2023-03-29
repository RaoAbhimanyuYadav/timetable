import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { hideNotificationReducer } from "../redux/reducers/notificationReducer";

// const SEVERITY = ["success", "error", "warning", "info"];

const Notification = () => {
    const dispatch = useDispatch();
    const notification = useSelector((state) => state.notification);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        dispatch(hideNotificationReducer());
    };
    return (
        <Snackbar
            open={notification.open}
            autoHideDuration={10000}
            onClose={handleClose}
        >
            <Alert
                onClose={handleClose}
                severity={notification.severity}
                sx={{ width: "100%" }}
            >
                {notification.message}
            </Alert>
        </Snackbar>
    );
};

export default Notification;
