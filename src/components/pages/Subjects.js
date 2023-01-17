import { useDispatch, useSelector } from "react-redux";
import {
  SUBJECT_DUMMY_DATA,
  SUBJECT_FORM_FIELDS,
  SUBJECT_TABLE_BODY_KEY,
  SUBJECT_TABLE_HEADING,
} from "../constants/subjectCostant";
import PageWrapper from "../HOC/PageWrapper";
import { clearTimeOffReducer } from "../redux/reducers/subjectReducer";

const Subjects = () => {
  const subjectData = useSelector((state) => state.subject);
  const dispatch = useDispatch();

  const formSubmitHandler = (e, id = null) => {
    const filteredData = {
      subject_name: e.target.subject_name.value,
      subject_code: e.target.subject_code.value,
      subject_time_off: subjectData.timeOffList,
    };
    console.log(filteredData);
    dispatch(clearTimeOffReducer());
  };
  const deleteHandler = () => {};
  return (
    <PageWrapper
      title={"Subjects"}
      tableBodyData={SUBJECT_DUMMY_DATA}
      tableHeadings={SUBJECT_TABLE_HEADING}
      tableBodykey={SUBJECT_TABLE_BODY_KEY}
      formFields={SUBJECT_FORM_FIELDS}
      formSubmitHandler={formSubmitHandler}
      deleteHandler={deleteHandler}
    />
  );
};

export default Subjects;
