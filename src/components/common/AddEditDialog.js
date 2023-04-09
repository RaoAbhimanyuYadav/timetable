import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Box } from "@mui/material";

import {
    CustomButton,
    CustomDialogTitle,
    CustomInputLabel,
    CustomMenuItem,
    CustomTextField,
} from "../utils/customComponents";
import ColorSelector from "./ColorSelector";
import TimeOff from "../specific/TimeOff";
import MultipleSelector from "./MultipleSelector";
import Select from "./Select";
import SemGrpSelect from "../specific/SemGrpSelect";

const inputFieldSelector = (obj, index, formData) => {
    if (obj.type === "color") {
        return <ColorSelector formData={formData} obj={obj} />;
    } else if (obj.type === "multipleSelector") {
        return <MultipleSelector formData={formData} obj={obj} />;
    } else if (obj.type === "semGrpSelector") {
        return <SemGrpSelect formData={formData} obj={obj} />;
    } else if (obj.type === "select") {
        return (
            <CustomTextField
                select
                autoFocus={index === 0}
                id={obj.key}
                name={obj.key}
                defaultValue={formData ? formData[obj.key] : obj.default}
            >
                {obj.options.map((option) => (
                    <CustomMenuItem key={option.value} value={option.value}>
                        {option.label}
                    </CustomMenuItem>
                ))}
            </CustomTextField>
        );
    } else if (obj.type === "time_off") {
        return <TimeOff formData={formData} obj={obj} />;
    } else if (obj.type === "asyncSelect") {
        return <Select formData={formData} obj={obj} />;
    } else if (obj.type === "checkbox") {
        return (
            <input
                type={"checkbox"}
                id={obj.key}
                name={obj.key}
                defaultChecked={formData ? formData[obj.key] : obj.default}
            />
        );
    } else {
        return (
            <CustomTextField
                margin="normal"
                required
                fullWidth
                type={obj.type}
                id={obj.key}
                name={obj.key}
                autoFocus={index === 0}
                defaultValue={formData ? formData[obj.key] : obj.default}
            />
        );
    }
};

export default function AddEditDialog({
    formFields,
    formData,
    formSubmitHandler,
    maxWidth,
}) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        formSubmitHandler(event, formData);
    };

    return (
        <div>
            <CustomButton onClick={handleClickOpen("paper")}>
                {formData ? "Edit" : "Add"}
            </CustomButton>
            <Dialog
                maxWidth={maxWidth ? maxWidth : "xs"}
                fullWidth={true}
                open={open}
                onClose={handleClose}
                scroll={"paper"}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <CustomDialogTitle id="scroll-dialog-title">
                    {formData ? "Edit" : "Add"}
                </CustomDialogTitle>
                <DialogContent dividers={true}>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        {formFields.map((obj, index) => {
                            return (
                                <Box key={index}>
                                    <CustomInputLabel>
                                        {obj.label}
                                    </CustomInputLabel>
                                    {inputFieldSelector(obj, index, formData)}
                                </Box>
                            );
                        })}

                        <DialogActions>
                            <CustomButton
                                onClick={() => {
                                    handleClose();
                                }}
                            >
                                Cancel
                            </CustomButton>
                            <CustomButton type="submit" onClick={handleClose}>
                                Submit
                            </CustomButton>
                        </DialogActions>
                    </Box>
                </DialogContent>
            </Dialog>
        </div>
    );
}
