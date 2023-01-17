import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SUBJECT_COLLECTION_NAME,
  SUBJECT_DUMMY_DATA,
  SUBJECT_FORM_FIELDS,
  SUBJECT_TABLE_BODY_KEY,
  SUBJECT_TABLE_HEADING,
} from "../constants/subjectCostant";
import PageWrapper from "../HOC/PageWrapper";
import {
  addOneDoc,
  deleteOneDoc,
  getAllDocs,
  updateOneDoc,
} from "../redux/actionThunk/firebaseThunk";
import {
  clearTimeOffReducer,
  updateSubjectReducer,
  addSubjectReducer,
  deleteSubjectReducer,
  setSubjectReducer,
} from "../redux/reducers/subjectReducer";

const Subjects = () => {
  const subjectData = useSelector((state) => state.subject);
  const dispatch = useDispatch();

  useEffect(() => {
    if (subjectData.isSubjectsFetched === false)
      dispatch(getAllDocs(SUBJECT_COLLECTION_NAME, setSubjectReducer));
  }, [dispatch, subjectData]);

  const formSubmitHandler = (e, id = null) => {
    const filteredData = {
      subject_name: e.target.subject_name.value,
      subject_code: e.target.subject_code.value,
      subject_time_off: subjectData.timeOffList,
    };
    if (id) {
      dispatch(
        updateOneDoc(
          SUBJECT_COLLECTION_NAME,
          updateSubjectReducer,
          filteredData,
          id
        )
      );
    } else if (id === null) {
      dispatch(
        addOneDoc(SUBJECT_COLLECTION_NAME, addSubjectReducer, filteredData)
      );
    }
    dispatch(clearTimeOffReducer());
  };

  const deleteHandler = (id) => {
    dispatch(deleteOneDoc(SUBJECT_COLLECTION_NAME, deleteSubjectReducer, id));
  };

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
