import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import PageWrapper from "../HOC/PageWrapper";

import {
  TIMING_TABLE_BODY_KEY,
  TIMING_TABLE_HEADING,
  WORKING_DAY_TABLE_BODY_KEY,
  WORKING_DAY_TABLE_HEADING,
  WORKING_DAY_FORM_FIELDS,
  TIMING_FORM_FIELDS,
  timingCollectionName,
  workingDayCollectionName,
} from "../constants/profileConstants";
import {
  addOneDoc,
  deleteOneDoc,
  getAllDocs,
  updateOneDoc,
} from "../redux/actionThunk/firebaseThunk";
import {
  addTimingReducer,
  addWorkingDayReducer,
  deleteTimingReducer,
  deleteWorkingDayReducer,
  setTimingReducer,
  setWorkingDaysReducer,
  updateTimingReducer,
  updateWorkingDayReducer,
} from "../redux/reducers/profileReducer";

const Profile = () => {
  const profileData = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    if (profileData.isBellTimingsFetched === false) {
      console.log("Bell Timing fetched");
      dispatch(getAllDocs(timingCollectionName, setTimingReducer));
    }

    if (profileData.isWorkingDaysFetched === false) {
      console.log("Working Days fetched");
      dispatch(getAllDocs(workingDayCollectionName, setWorkingDaysReducer));
    }
  }, [dispatch, profileData]);

  const bellTimingFormSubmitHandler = (e, id = null) => {
    // Data checking
    const filteredData = {
      name: e.target.name.value,
      start_time: e.target.start_time.value,
      end_time: e.target.end_time.value,
    };
    if (id === null)
      dispatch(addOneDoc(timingCollectionName, addTimingReducer, filteredData));
    else
      dispatch(
        updateOneDoc(
          timingCollectionName,
          updateTimingReducer,
          filteredData,
          id
        )
      );
  };

  const bellTimingDeleteHandler = (id) => {
    dispatch(deleteOneDoc(timingCollectionName, deleteTimingReducer, id));
  };

  const workingDaysFormSubmitHandler = (e, id = null) => {
    const filteredData = {
      name: e.target.name.value,
    };
    if (id === null)
      dispatch(
        addOneDoc(workingDayCollectionName, addWorkingDayReducer, filteredData)
      );
    else
      dispatch(
        updateOneDoc(
          workingDayCollectionName,
          updateWorkingDayReducer,
          filteredData,
          id
        )
      );
  };

  const workingDaysDeleteHandler = (id) => {
    dispatch(
      deleteOneDoc(workingDayCollectionName, deleteWorkingDayReducer, id)
    );
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
