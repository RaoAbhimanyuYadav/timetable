import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import {
  TEACHER_COLLECTION_NAME,
  TEACHER_FORM_FIELDS,
  TEACHER_TABLE_BODY_KEY,
  TEACHER_TABLE_HEADING,
} from "../constants/teacherConstant";
import PageWrapper from "../HOC/PageWrapper";
import useFetchAll from "../hooks/useFetchAll";

import { clearTimeOffReducer } from "../redux/reducers/commonReducers";

const Teachers = () => {
  const dispatch = useDispatch();

  const { isLoading } = useFetchAll();

  const teacherData = useSelector((state) => state.teacher);
  const timeOffList = useSelector((state) => state.common.timeOffList) || [];
  const selectedColor =
    useSelector((state) => state.common.selectedColor) || [];

  const formSubmitHandler = (e, data) => {
    const filteredData = {
      id: uuidv4(),
      teacher_name: e.target.teacher_name.value,
      teacher_code: e.target.teacher_code.value,
      teacher_color: selectedColor,
      teacher_time_off: timeOffList,
    };
    if (data) {
      // update doc
    } else {
      // create doc
    }
    dispatch(clearTimeOffReducer());
  };

  const deleteHandler = (data) => {
    // delete doc
  };

  if (isLoading) return <>Loading</>;

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
