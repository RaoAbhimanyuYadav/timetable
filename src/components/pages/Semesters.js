import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import {
  SEMESTER_COLLECTION_NAME,
  SEMESTER_FORM_FIELDS,
  SEMESTER_TABLE_BODY_KEY,
  SEMESTER_TABLE_HEADING,
} from "../constants/semesterConstant";

import PageWrapper from "../HOC/PageWrapper";
import {
  clearGroupReducer,
  clearTimeOffReducer,
} from "../redux/reducers/commonReducers";

import useFetchAll from "../hooks/useFetchAll";

const Semesters = () => {
  const dispatch = useDispatch();
  const { isLoading } = useFetchAll();

  const timeOffList = useSelector((state) => state.common.timeOffList) || [];
  const groupList = useSelector((state) => state.common.groupList) || [];
  const semesterData = useSelector((state) => state.semester);

  const formSubmitHandler = (e, data) => {
    const filteredData = {
      id: uuidv4(),
      semester_name: e.target.semester_name.value,
      semester_code: e.target.semester_code.value,
      semester_groups: groupList,
      semester_time_off: timeOffList,
    };
    if (data) {
      // update doc
    } else {
      // create doc
    }
    dispatch(clearTimeOffReducer());
    dispatch(clearGroupReducer());
  };

  const deleteHandler = (data) => {
    // delete doc
  };

  if (isLoading) return <>Loading</>;
  return (
    <PageWrapper
      title={"Semesters"}
      tableBodyData={semesterData?.semesterList || []}
      tableHeadings={SEMESTER_TABLE_HEADING}
      tableBodykey={SEMESTER_TABLE_BODY_KEY}
      formFields={SEMESTER_FORM_FIELDS}
      formSubmitHandler={formSubmitHandler}
      deleteHandler={deleteHandler}
    />
  );
};

export default Semesters;
