import { useSelector } from "react-redux";

import {
  CustomButton,
  CustomMenuItem,
  CustomTextField,
} from "../utils/customComponents";

const TimeOff = ({ setTimeId, setDayId, handleSubmit }) => {
  const profileData = useSelector((state) => state.profile);

  return (
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
};

export default TimeOff;
