import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CLASSROOM_COLLECTION_NAME,
  CLASSROOM_FORM_FIELDS,
  CLASSROOM_TABLE_BODY_KEY,
  CLASSROOM_TABLE_HEADING,
} from "../constants/classroomConstants";
import PageWrapper from "../HOC/PageWrapper";
import {
  addOneDoc,
  deleteOneDoc,
  getAllDocs,
  updateOneDoc,
} from "../redux/actionThunk/firebaseThunk";
import {
  addClassroomReducer,
  deleteClassroomReducer,
  setClassroomReducer,
  updateClassroomReducer,
} from "../redux/reducers/classroomReducers";
import { clearTimeOffReducer } from "../redux/reducers/commonReducers";

const Classrooms = () => {
  const dispatch = useDispatch();

  const classroomData = useSelector((state) => state.classroom);
  const timeOffList = useSelector((state) => state.common.timeOffList) || [];

  useEffect(() => {
    if (classroomData.isClassroomsFetched === false)
      dispatch(getAllDocs(CLASSROOM_COLLECTION_NAME, setClassroomReducer));
  }, [dispatch, classroomData]);

  const formSubmitHandler = (e, id = null) => {
    const filteredData = {
      classroom_name: e.target.classroom_name.value,
      classroom_code: e.target.classroom_code.value,
      classroom_time_off: timeOffList,
    };
    if (id) {
      dispatch(
        updateOneDoc(
          CLASSROOM_COLLECTION_NAME,
          updateClassroomReducer,
          filteredData,
          id
        )
      );
    } else if (id === null) {
      dispatch(
        addOneDoc(CLASSROOM_COLLECTION_NAME, addClassroomReducer, filteredData)
      );
    }
    dispatch(clearTimeOffReducer());
  };

  const deleteHandler = (id) => {
    dispatch(
      deleteOneDoc(CLASSROOM_COLLECTION_NAME, deleteClassroomReducer, id)
    );
  };

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
