import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SEMESTER_COLLECTION_NAME,
  SEMESTER_FORM_FIELDS,
  SEMESTER_TABLE_BODY_KEY,
  SEMESTER_TABLE_HEADING,
} from "../constants/semesterConstant";

import PageWrapper from "../HOC/PageWrapper";
import { clearTimeOffReducer } from "../redux/reducers/commonReducers";

import {
  addOneDoc,
  deleteOneDoc,
  getAllDocs,
  updateOneDoc,
} from "../redux/actionThunk/firebaseThunk";
import {
  addSemesterReducer,
  deleteSemesterReducer,
  setSemesterReducer,
  updateSemesterReducer,
} from "../redux/reducers/semesterReducer";

const Semesters = () => {
  const dispatch = useDispatch();

  const timeOffList = useSelector((state) => state.common.timeOffList) || [];
  const semesterData = useSelector((state) => state.semester);

  useEffect(() => {
    if (semesterData.isSemestersFetched === false)
      dispatch(getAllDocs(SEMESTER_COLLECTION_NAME, setSemesterReducer));
  }, [dispatch, semesterData]);

  const formSubmitHandler = (e, id = null) => {
    const filteredData = {
      semester_name: e.target.semester_name.value,
      semester_code: e.target.semester_code.value,
      semester_groups: e.target.semester_groups.value,
      semester_time_off: timeOffList,
    };
    if (id === null) {
      dispatch(
        addOneDoc(SEMESTER_COLLECTION_NAME, addSemesterReducer, filteredData)
      );
    } else if (id) {
      dispatch(
        updateOneDoc(
          SEMESTER_COLLECTION_NAME,
          updateSemesterReducer,
          filteredData,
          id
        )
      );
    }
    dispatch(clearTimeOffReducer());
  };

  const deleteHandler = (id) => {
    dispatch(deleteOneDoc(SEMESTER_COLLECTION_NAME, deleteSemesterReducer, id));
  };
  return (
    <PageWrapper
      title={"Semesters"}
      tableBodyData={semesterData.semesterList || []}
      tableHeadings={SEMESTER_TABLE_HEADING}
      tableBodykey={SEMESTER_TABLE_BODY_KEY}
      formFields={SEMESTER_FORM_FIELDS}
      formSubmitHandler={formSubmitHandler}
      deleteHandler={deleteHandler}
    />
  );
};

export default Semesters;
