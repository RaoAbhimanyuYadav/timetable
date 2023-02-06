import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";

import { CustomButton, CustomDialogTitle } from "../utils/customComponents";

export default function ConfirmDelete({ data, deleteHandler, tableBodykey }) {
    const [open, setOpen] = React.useState(false);

    const objName = () => {
        let name = "";
        tableBodykey.forEach((key) => {
            if (typeof data[key] === "string" || typeof data[key] === "number")
                name += data[key] + " ";
        });
        return name;
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <CustomButton onClick={handleClickOpen}>Delete</CustomButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <CustomDialogTitle
                    id="alert-dialog-title"
                    sx={{ fontSize: "clamp(10px,2vw,24px)" }}
                >
                    {`Are you sure want to delete ${objName()} row?`}
                </CustomDialogTitle>
                <DialogActions>
                    <CustomButton onClick={handleClose}>Cancel</CustomButton>
                    <CustomButton
                        onClick={() => {
                            handleClose();
                            deleteHandler(data);
                        }}
                        autoFocus
                    >
                        Yes, Delete
                    </CustomButton>
                </DialogActions>
            </Dialog>
        </div>
    );
}
