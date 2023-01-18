import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomDialog from "../HOC/CustomDialog";
import {
  addTimeOffReducer,
  clearTimeOffReducer,
  removeFromTimeOffReducer,
  setTimeOffReducer,
} from "../redux/reducers/commonReducers";
import { CustomButton, CustomTypography } from "../utils/customComponents";
import TimeOff from "./TimeOff";

const MultipleSelectorField = ({ formData, obj }) => {
  const [open, setOpen] = useState(false);
  const [timeId, setTimeId] = useState(null);
  const [dayId, setDayId] = useState(null);

  const profileData = useSelector((state) => state.profile);
  const timeOffList = useSelector((state) => state.common.timeOffList) || [];

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (formData) dispatch(setTimeOffReducer(formData[obj.key]));
    else dispatch(setTimeOffReducer([]));
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
    <TimeOff
      setDayId={setDayId}
      setTimeId={setTimeId}
      handleSubmit={handleSubmit}
    />
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

      {timeOffList.map((ele, i) => (
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
