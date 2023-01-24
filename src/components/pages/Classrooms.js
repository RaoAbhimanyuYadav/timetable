import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import {
  CLASSROOM_COLLECTION_NAME,
  CLASSROOM_FORM_FIELDS,
  CLASSROOM_TABLE_BODY_KEY,
  CLASSROOM_TABLE_HEADING,
} from "../constants/classroomConstants";
import PageWrapper from "../HOC/PageWrapper";
import useFetchAll from "../hooks/useFetchAll";
import {
  addOneDoc,
  deleteOneDoc,
  updateOneDoc,
} from "../redux/actionThunk/firebaseThunk";
import {
  addClassroomReducer,
  deleteClassroomReducer,
  updateClassroomReducer,
} from "../redux/reducers/classroomReducers";
import { clearTimeOffReducer } from "../redux/reducers/commonReducers";

const Classrooms = () => {
  const dispatch = useDispatch();

  const classroomData = useSelector((state) => state.classroom);
  const timeOffList = useSelector((state) => state.common.timeOffList) || [];
  const user = useSelector((state) => state.auth.user);

  const { isLoading } = useFetchAll();

  const formSubmitHandler = (e, data) => {
    const filteredData = {
      id: uuidv4(),
      classroom_name: e.target.classroom_name.value,
      classroom_code: e.target.classroom_code.value,
      classroom_time_off: timeOffList,
    };
    if (data) {
      dispatch(
        updateOneDoc(
          CLASSROOM_COLLECTION_NAME,
          updateClassroomReducer,
          data,
          filteredData,
          user
        )
      );
    } else {
      dispatch(
        addOneDoc(
          CLASSROOM_COLLECTION_NAME,
          addClassroomReducer,
          filteredData,
          user
        )
      );
    }
    dispatch(clearTimeOffReducer());
  };

  const deleteHandler = (data) => {
    dispatch(
      deleteOneDoc(
        CLASSROOM_COLLECTION_NAME,
        deleteClassroomReducer,
        data,
        user
      )
    );
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
