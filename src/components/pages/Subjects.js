import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import {
  SUBJECT_COLLECTION_NAME,
  SUBJECT_FORM_FIELDS,
  SUBJECT_TABLE_BODY_KEY,
  SUBJECT_TABLE_HEADING,
} from "../constants/subjectCostant";
import PageWrapper from "../HOC/PageWrapper";
import useFetchAll from "../hooks/useFetchAll";

import { clearTimeOffReducer } from "../redux/reducers/commonReducers";

const Subjects = () => {
  const dispatch = useDispatch();

  const { isLoading } = useFetchAll();

  const subjectData = useSelector((state) => state.subject);
  const timeOffList = useSelector((state) => state.common.timeOffList) || [];

  const formSubmitHandler = (e, data) => {
    const filteredData = {
      id: uuidv4(),
      subject_name: e.target.subject_name.value,
      subject_code: e.target.subject_code.value,
      subject_time_off: timeOffList,
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
