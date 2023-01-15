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
  const body = {};
  formFields.forEach((obj) => {
    body[obj.key] = formData ? formData[obj.key] : obj.default;
  });

  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState(body);

  const handleClickOpen = () => () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnChange = (e, key, obj) => {
    setData((pre) => {
      let newData = { ...pre };
      newData[key] = e.target.value;
      return newData;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    formData ? formSubmitHandler(data, formData.id) : formSubmitHandler(data);
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
                      onChange={(e) => {
                        handleOnChange(e, obj.key, obj);
                      }}
                      value={data[obj.key]}
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
                      onChange={(e) => {
                        handleOnChange(e, obj.key, obj);
                      }}
                      value={data[obj.key]}
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
