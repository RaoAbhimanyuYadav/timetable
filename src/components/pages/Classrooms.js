import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  CLASSROOM_URL,
  CLASSROOM_FORM_FIELDS,
  CLASSROOM_TABLE_BODY_KEY,
  CLASSROOM_TABLE_HEADING,
} from "../constants/classroomConstants";
import PageWrapper from "../HOC/PageWrapper";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useFetchAll from "../hooks/useFetchAll";
import {
  addData,
  deleteData,
  getData,
  updateData,
} from "../redux/actionThunk/apiThunk";
import {
  addClassroomReducer,
  deleteClassroomReducer,
  setClassroomReducer,
  updateClassroomReducer,
} from "../redux/reducers/classroomReducers";

import { clearTimeOffReducer } from "../redux/reducers/commonReducers";

const Classrooms = () => {
  const dispatch = useDispatch();

  const axios = useAxiosPrivate();

  const classroomData = useSelector((state) => state.classroom);
  const timeOffList = useSelector((state) => state.common.timeOffList) || [];

  const { isLoading } = useFetchAll();

  useEffect(() => {
    if (!classroomData.isClassroomsFetched)
      dispatch(getData(axios, CLASSROOM_URL, setClassroomReducer));
  }, []);

  const formSubmitHandler = (e, data) => {
    const filteredData = {
      name: e.target.name.value,
      code: e.target.code.value,
      classroom_time_off_set: timeOffList,
    };
    if (data) {
      filteredData["id"] = data.id;
      // update doc
      dispatch(
        updateData(axios, CLASSROOM_URL, updateClassroomReducer, filteredData)
      );
    } else {
      // create doc
      dispatch(
        addData(axios, CLASSROOM_URL, addClassroomReducer, filteredData)
      );
    }
    dispatch(clearTimeOffReducer());
  };

  const deleteHandler = (data) => {
    // delete doc
    dispatch(deleteData(axios, CLASSROOM_URL, deleteClassroomReducer, data.id));
  };

  if (isLoading) return <>Loading</>;

  return (
    <PageWrapper
      title={"Classrooms"}
      tableBodyData={classroomData.classroomList || []}
      tableHeadings={CLASSROOM_TABLE_HEADING}
      tableBodykey={CLASSROOM_TABLE_BODY_KEY}
      formFields={CLASSROOM_FORM_FIELDS}
      formSubmitHandler={formSubmitHandler}
      deleteHandler={deleteHandler}
    />
  );
};

export default Classrooms;
