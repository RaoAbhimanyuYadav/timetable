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
  getAllTiming,
  updateOneTiming,
} from "../redux/actionThunk/profileThunk";

const Profile = () => {
  const formSubmitHandler = (e, id = null) => {
    // Data checking

    const filteredData = {
      name: e.target.name.value,
      start_time: e.target.start_time.value,
      end_time: e.target.end_time.value,
    };
    if (id === null) {
      dispatch(addOneTiming(filteredData));
    } else {
      dispatch(updateOneTiming(filteredData, id));
    }
  };
  const deleteHandler = () => {};

  const profileData = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTiming());
    console.log("useEffect disptach");
  }, [dispatch]);

  return (
    <>
      <PageWrapper
        title={"Bell Timings"}
        formFields={TIMING_FORM_FIELDS}
        tableHeadings={TIMING_TABLE_HEADING}
        tableBodykey={TIMING_TABLE_BODY_KEY}
        tableBodyData={profileData ? profileData.bellTimings : []}
        formSubmitHandler={formSubmitHandler}
        deleteHandler={deleteHandler}
      />
      <PageWrapper
        title={"Working Days"}
        formFields={WORKING_DAY_FORM_FIELDS}
        tableHeadings={WORKING_DAY_TABLE_HEADING}
        tableBodykey={WORKING_DAY_TABLE_BODY_KEY}
        tableBodyData={profileData ? profileData.workingDays : []}
        formSubmitHandler={formSubmitHandler}
        deleteHandler={deleteHandler}
      />
    </>
  );
};

export default Profile;
