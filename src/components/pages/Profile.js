import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

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
  updateOneDoc,
} from "../redux/actionThunk/firebaseThunk";
import {
  addTimingReducer,
  addWorkingDayReducer,
  deleteTimingReducer,
  deleteWorkingDayReducer,
  updateTimingReducer,
  updateWorkingDayReducer,
} from "../redux/reducers/profileReducer";
import useFetchAll from "../hooks/useFetchAll";

const Profile = () => {
  const dispatch = useDispatch();

  const profileData = useSelector((state) => state.profile);
  const user = useSelector((state) => state.auth.user);

  const { isLoading } = useFetchAll();

  const bellTimingFormSubmitHandler = (e, data) => {
    // Data checking
    const filteredData = {
      id: uuidv4(),
      name: e.target.name.value,
      start_time: e.target.start_time.value,
      end_time: e.target.end_time.value,
    };
    if (data)
      dispatch(
        updateOneDoc(
          timingCollectionName,
          updateTimingReducer,
          data,
          filteredData,
          user
        )
      );
    else
      dispatch(
        addOneDoc(timingCollectionName, addTimingReducer, filteredData, user)
      );
  };

  const bellTimingDeleteHandler = (data) => {
    dispatch(
      deleteOneDoc(timingCollectionName, deleteTimingReducer, data, user)
    );
  };

  const workingDaysFormSubmitHandler = (e, data) => {
    const filteredData = {
      id: uuidv4(),
      name: e.target.name.value,
    };
    if (data)
      dispatch(
        updateOneDoc(
          workingDayCollectionName,
          updateWorkingDayReducer,
          data,
          filteredData,
          user
        )
      );
    else
      dispatch(
        addOneDoc(
          workingDayCollectionName,
          addWorkingDayReducer,
          filteredData,
          user
        )
      );
  };

  const workingDaysDeleteHandler = (data) => {
    dispatch(
      deleteOneDoc(
        workingDayCollectionName,
        deleteWorkingDayReducer,
        data,
        user
      )
    );
  };

  return isLoading ? (
    <>Loading</>
  ) : (
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
