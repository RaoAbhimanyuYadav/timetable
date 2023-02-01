import { Dialog, DialogActions, DialogContent } from "@mui/material";

import { CustomButton, CustomDialogTitle } from "../utils/customComponents";

const CustomDialog = ({
    title,
    content,
    onClose,
    onSubmit,
    open,
    maxWidth,
}) => {
    return (
        <Dialog
            maxWidth={maxWidth ? maxWidth : "xs"}
            fullWidth={true}
            open={open}
            onClose={onClose}
            scroll={"paper"}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <CustomDialogTitle id="scroll-dialog-title">
                {title}
            </CustomDialogTitle>
            <DialogContent dividers={true}>{content}</DialogContent>
            {onSubmit && (
                <DialogActions>
                    <CustomButton onClick={onClose}>Cancel</CustomButton>
                    <CustomButton type="submit" onClick={onSubmit}>
                        Submit
                    </CustomButton>
                </DialogActions>
            )}
        </Dialog>
    );
};

export default CustomDialog;
