import PageWrapper from "../HOC/PageWrapper";

import {
  TIMING_TABLE_BODY_KEY,
  TIMING_TABLE_HEADING,
  WORKING_DAY_TABLE_BODY_KEY,
  WORKING_DAY_TABLE_HEADING,
  DUMMY_DATA,
  WORKING_DAY_FORM_FIELDS,
  TIMING_FORM_FIELDS,
} from "../constants/profileConstants";

const Profile = () => {
  const formSubmitHandler = (data, id = null) => {
    // Data checking
    console.log(data);
  };
  const deleteHandler = () => {};
  return (
    <>
      <PageWrapper
        title={"Bell Timings"}
        formFields={TIMING_FORM_FIELDS}
        tableHeadings={TIMING_TABLE_HEADING}
        tableBodykey={TIMING_TABLE_BODY_KEY}
        tableBodyData={DUMMY_DATA.bellTimings}
        formSubmitHandler={formSubmitHandler}
        deleteHandler={deleteHandler}
      />
      <PageWrapper
        title={"Working Days"}
        formFields={WORKING_DAY_FORM_FIELDS}
        tableHeadings={WORKING_DAY_TABLE_HEADING}
        tableBodykey={WORKING_DAY_TABLE_BODY_KEY}
        tableBodyData={DUMMY_DATA.workingDays}
        formSubmitHandler={formSubmitHandler}
        deleteHandler={deleteHandler}
      />
    </>
  );
};

export default Profile;
