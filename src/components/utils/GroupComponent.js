import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import CustomDialog from "../HOC/CustomDialog";
import {
  addGroupReducer,
  clearGroupReducer,
  removeFromGroupReducer,
  setGroupListReducer,
} from "../redux/reducers/commonReducers";
import {
  CustomButton,
  CustomInputLabel,
  CustomTextField,
  CustomTypography,
} from "./customComponents";

const GroupComponent = ({ formData, obj }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const groupList = useSelector((state) => state.common.groupList) || [];

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (formData) dispatch(setGroupListReducer(formData[obj.key]));
    else dispatch(setGroupListReducer([{ name: "Whole", code: "W" }]));
  }, [formData, dispatch, obj]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "" || code === "") return;

    dispatch(
      addGroupReducer({
        name: name,
        code: code,
      })
    );
    handleClose();
    setName("");
    setCode("");
  };

  const handleDelete = (i) => {
    dispatch(removeFromGroupReducer(i));
  };

  const content = (
    <>
      <CustomInputLabel>Group Name</CustomInputLabel>
      <CustomTextField
        margin="normal"
        required
        fullWidth
        type={"text"}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <CustomInputLabel>Short Name</CustomInputLabel>
      <CustomTextField
        margin="normal"
        required
        fullWidth
        type={"text"}
        onChange={(e) => setCode(e.target.value)}
        value={code}
      />
      <CustomButton onClick={handleSubmit}>Add</CustomButton>
    </>
  );

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <CustomButton onClick={handleClickOpen}>Add More</CustomButton>
        <CustomButton
          onClick={() => {
            dispatch(clearGroupReducer());
          }}
        >
          Clear
        </CustomButton>
      </Box>
      <CustomDialog
        title={"Groups"}
        onClose={handleClose}
        open={open}
        content={content}
      />

      {groupList.map((ele, i) => (
        <Box key={i} sx={{ display: "flex", justifyContent: "space-between" }}>
          <CustomTypography>{`${ele.name}(${ele.code})`}</CustomTypography>
          {i ? (
            <CustomButton
              onClick={() => {
                handleDelete(i);
              }}
            >
              Delete
            </CustomButton>
          ) : (
            ""
          )}
        </Box>
      ))}
    </Box>
  );
};

export default GroupComponent;
