import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SEMESTER_DUMMY_DATA,
  SEMESTER_FORM_FIELDS,
  SEMESTER_TABLE_BODY_KEY,
  SEMESTER_TABLE_HEADING,
} from "../constants/semesterConstant";

import PageWrapper from "../HOC/PageWrapper";
import { clearTimeOffReducer } from "../redux/reducers/commonReducers";

const Semesters = () => {
  const dispatch = useDispatch();

  const timeOffList = useSelector((state) => state.common.timeOffList) || [];

  const formSubmitHandler = (e, id = null) => {
    const filteredData = {
      semester_name: e.target.semester_name.value,
      semester_code: e.target.semester_code.value,
      semester_groups: e.target.semester_groups.value,
      semester_time_off: timeOffList,
    };
    if (id === null) {
    } else if (id) {
    }
    console.log(filteredData);

    dispatch(clearTimeOffReducer());
  };

  const deleteHandler = (id) => {};
  return (
    <PageWrapper
      title={"Semesters"}
      tableBodyData={SEMESTER_DUMMY_DATA || []}
      tableHeadings={SEMESTER_TABLE_HEADING}
      tableBodykey={SEMESTER_TABLE_BODY_KEY}
      formFields={SEMESTER_FORM_FIELDS}
      formSubmitHandler={formSubmitHandler}
      deleteHandler={deleteHandler}
    />
  );
};

export default Semesters;
