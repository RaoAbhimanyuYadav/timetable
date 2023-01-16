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

export default function AddEditDialog({
  formFields,
  formData,
  formSubmitHandler,
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
    formData ? formSubmitHandler(event, formData.id) : formSubmitHandler(event);
  };

  return (
    <div>
      <CustomButton onClick={handleClickOpen("paper")}>
        {formData ? "Edit" : "Add"}
      </CustomButton>
      <Dialog
        maxWidth="xs"
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
                  <CustomInputLabel>{obj.label}</CustomInputLabel>
                  {obj.type === "select" ? (
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
                  ) : (
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
                  )}
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
