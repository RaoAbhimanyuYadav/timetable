import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomDialog from "../HOC/CustomDialog";
import {
  addTimeOffReducer,
  clearTimeOffReducer,
  removeFromTimeOffReducer,
  setTimeOffReducer,
} from "../redux/reducers/subjectReducer";
import {
  CustomButton,
  CustomMenuItem,
  CustomTextField,
  CustomTypography,
} from "../utils/customComponents";

const MultipleSelectorField = ({ formData, obj }) => {
  const [open, setOpen] = useState(false);
  const [timeId, setTimeId] = useState(null);
  const [dayId, setDayId] = useState(null);

  const profileData = useSelector((state) => state.profile);
  const subjectData = useSelector((state) => state.subject);

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (formData) dispatch(setTimeOffReducer(formData[obj.key]));
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!timeId || !dayId) return;

    const timeIndex = profileData.bellTimings.findIndex(
      (ele) => ele.id === timeId
    );
    const dayIndex = profileData.workingDays.findIndex(
      (ele) => ele.id === dayId
    );

    const timeObj = profileData.bellTimings[timeIndex];
    const dayObj = profileData.workingDays[dayIndex];

    dispatch(
      addTimeOffReducer({
        day_id: dayObj.id,
        day: dayObj.name,
        time_id: timeObj.id,
        time_name: timeObj.name,
        time_start: timeObj.start_time,
        time_end: timeObj.end_time,
      })
    );
    handleClose();
  };

  const handleDelete = (i) => {
    dispatch(removeFromTimeOffReducer(i));
  };

  const content = (
    <>
      <CustomTextField
        select
        id={"timeId"}
        name={"timeId"}
        onChange={(e) => setTimeId(e.target.value)}
        defaultValue={
          profileData.bellTimings.length ? profileData.bellTimings[0].id : ""
        }
      >
        {profileData.bellTimings.map((option) => (
          <CustomMenuItem key={option.id} value={option.id}>
            {`${option.start_time}-${option.end_time}`}
          </CustomMenuItem>
        ))}
      </CustomTextField>
      <CustomTextField
        select
        id={"dayId"}
        name={"dayId"}
        onChange={(e) => setDayId(e.target.value)}
        defaultValue={
          profileData.workingDays.length ? profileData.workingDays[0].id : ""
        }
      >
        {profileData.workingDays.map((option) => (
          <CustomMenuItem key={option.id} value={option.id}>
            {option.name}
          </CustomMenuItem>
        ))}
      </CustomTextField>
      <br />
      <CustomButton onClick={handleSubmit}>Add</CustomButton>
    </>
  );

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <CustomButton onClick={handleClickOpen}>Add More</CustomButton>
        <CustomButton
          onClick={() => {
            dispatch(clearTimeOffReducer());
          }}
        >
          Clear
        </CustomButton>
      </Box>
      <CustomDialog
        title={"Selector"}
        onClose={handleClose}
        open={open}
        content={content}
      />

      {subjectData.timeOffList.map((ele, i) => (
        <Box
          id={i}
          key={i}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <CustomTypography>{`${ele.day} : ${ele.time_start}-${ele.time_end}`}</CustomTypography>
          <CustomButton
            onClick={() => {
              handleDelete(i);
            }}
          >
            Delete
          </CustomButton>
        </Box>
      ))}
    </Box>
  );
};

export default MultipleSelectorField;
