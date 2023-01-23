import { useDispatch, useSelector } from "react-redux";
import {
  TEACHER_COLLECTION_NAME,
  TEACHER_FORM_FIELDS,
  TEACHER_TABLE_BODY_KEY,
  TEACHER_TABLE_HEADING,
} from "../constants/teacherConstant";
import PageWrapper from "../HOC/PageWrapper";
import useFetchAll from "../hooks/useFetchAll";
import {
  addOneDoc,
  deleteOneDoc,
  updateOneDoc,
} from "../redux/actionThunk/firebaseThunk";
import { clearTimeOffReducer } from "../redux/reducers/commonReducers";
import {
  addTeacherReducer,
  deleteTeacherReducer,
  updateTeacherReducer,
} from "../redux/reducers/teacherReducers";

const Teachers = () => {
  const dispatch = useDispatch();

  const { isLoadingTeacher } = useFetchAll();

  const teacherData = useSelector((state) => state.teacher);
  const timeOffList = useSelector((state) => state.common.timeOffList) || [];
  const selectedColor =
    useSelector((state) => state.common.selectedColor) || [];

  const formSubmitHandler = (e, id = null) => {
    const filteredData = {
      teacher_name: e.target.teacher_name.value,
      teacher_code: e.target.teacher_code.value,
      teacher_color: selectedColor,
      teacher_time_off: timeOffList,
    };
    if (id) {
      dispatch(
        updateOneDoc(
          TEACHER_COLLECTION_NAME,
          updateTeacherReducer,
          filteredData,
          id
        )
      );
    } else if (id === null) {
      dispatch(
        addOneDoc(TEACHER_COLLECTION_NAME, addTeacherReducer, filteredData)
      );
    }
    dispatch(clearTimeOffReducer());
  };

  const deleteHandler = (id) => {
    dispatch(deleteOneDoc(TEACHER_COLLECTION_NAME, deleteTeacherReducer, id));
  };

  if (isLoadingTeacher) return <>Loading</>;

  return (
    <PageWrapper
      title={"Teachers"}
      tableBodyData={teacherData.teacherList || []}
      tableHeadings={TEACHER_TABLE_HEADING}
      tableBodykey={TEACHER_TABLE_BODY_KEY}
      formFields={TEACHER_FORM_FIELDS}
      formSubmitHandler={formSubmitHandler}
      deleteHandler={deleteHandler}
    />
  );
};

export default Teachers;
