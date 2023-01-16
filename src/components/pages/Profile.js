import PageWrapper from "../HOC/PageWrapper";

import {
  TIMING_TABLE_BODY_KEY,
  TIMING_TABLE_HEADING,
  WORKING_DAY_TABLE_BODY_KEY,
  WORKING_DAY_TABLE_HEADING,
  WORKING_DAY_FORM_FIELDS,
  TIMING_FORM_FIELDS,
} from "../constants/profileConstants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  addOneTiming,
  addOneWorkingDay,
  deleteOneTiming,
  getAllTiming,
  getAllWorkingDays,
  updateOneTiming,
} from "../redux/actionThunk/profileThunk";

const Profile = () => {
  const profileData = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTiming());
    dispatch(getAllWorkingDays());
    console.log("useEffect disptach");
  }, [dispatch]);

  const bellTimingFormSubmitHandler = (e, id = null) => {
    // Data checking
    const filteredData = {
      name: e.target.name.value,
      start_time: e.target.start_time.value,
      end_time: e.target.end_time.value,
    };
    if (id === null) dispatch(addOneTiming(filteredData));
    else dispatch(updateOneTiming(filteredData, id));
  };

  const bellTimingDeleteHandler = (id) => {
    dispatch(deleteOneTiming(id));
  };

  const workingDaysFormSubmitHandler = (e, id = null) => {
    const filteredData = {
      name: e.target.name.value,
    };
    if (id === null) dispatch(addOneWorkingDay(filteredData));
  };

  const workingDaysDeleteHandler = (id) => {
    console.log(id);
  };

  return (
    <>
      <PageWrapper
        title={"Bell Timings"}
        formFields={TIMING_FORM_FIELDS}
        tableHeadings={TIMING_TABLE_HEADING}
        tableBodykey={TIMING_TABLE_BODY_KEY}
        tableBodyData={profileData ? profileData.bellTimings : []}
        formSubmitHandler={bellTimingFormSubmitHandler}
        deleteHandler={bellTimingDeleteHandler}
      />
      <PageWrapper
        title={"Working Days"}
        formFields={WORKING_DAY_FORM_FIELDS}
        tableHeadings={WORKING_DAY_TABLE_HEADING}
        tableBodykey={WORKING_DAY_TABLE_BODY_KEY}
        tableBodyData={profileData ? profileData.workingDays : []}
        formSubmitHandler={workingDaysFormSubmitHandler}
        deleteHandler={workingDaysDeleteHandler}
      />
    </>
  );
};

export default Profile;
