import { useDispatch, useSelector } from "react-redux";

import {
  SUBJECT_URL,
  SUBJECT_FORM_FIELDS,
  SUBJECT_TABLE_BODY_KEY,
  SUBJECT_TABLE_HEADING,
} from "../constants/subjectCostant";
import PageWrapper from "../HOC/PageWrapper";
import useFetchAll from "../hooks/useFetchAll";

import { clearTimeOffReducer } from "../redux/reducers/commonReducers";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useEffect } from "react";
import {
  addData,
  deleteData,
  getData,
  updateData,
} from "../redux/actionThunk/apiThunk";
import {
  addSubjectReducer,
  deleteSubjectReducer,
  setSubjectReducer,
  updateSubjectReducer,
} from "../redux/reducers/subjectReducer";

const Subjects = () => {
  const dispatch = useDispatch();

  const axios = useAxiosPrivate();
  const { isLoading } = useFetchAll();

  const subjectData = useSelector((state) => state.subject);
  const timeOffList = useSelector((state) => state.common.timeOffList) || [];

  const formSubmitHandler = (e, data) => {
    const filteredData = {
      name: e.target.name.value,
      code: e.target.code.value,
      subject_time_off_set: timeOffList,
    };
    if (data) {
      filteredData["id"] = data.id;
      // update doc
      dispatch(
        updateData(axios, SUBJECT_URL, updateSubjectReducer, filteredData)
      );
    } else {
      // create doc
      dispatch(addData(axios, SUBJECT_URL, addSubjectReducer, filteredData));
    }
    dispatch(clearTimeOffReducer());
  };

  const deleteHandler = (data) => {
    // delete doc
    dispatch(deleteData(axios, SUBJECT_URL, deleteSubjectReducer, data.id));
  };

  useEffect(() => {
    if (!subjectData.isSubjectsFetched)
      dispatch(getData(axios, SUBJECT_URL, setSubjectReducer));
  }, [axios]);

  if (isLoading) return <>Loading</>;

  return (
    <PageWrapper
      title={"Subjects"}
      tableBodyData={subjectData.subjectList || []}
      tableHeadings={SUBJECT_TABLE_HEADING}
      tableBodykey={SUBJECT_TABLE_BODY_KEY}
      formFields={SUBJECT_FORM_FIELDS}
      formSubmitHandler={formSubmitHandler}
      deleteHandler={deleteHandler}
    />
  );
};

export default Subjects;
