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
import {
  addOneDoc,
  deleteOneDoc,
  updateOneDoc,
} from "../redux/actionThunk/firebaseThunk";
import { clearTimeOffReducer } from "../redux/reducers/commonReducers";
import {
  updateSubjectReducer,
  addSubjectReducer,
  deleteSubjectReducer,
} from "../redux/reducers/subjectReducer";

const Subjects = () => {
  const dispatch = useDispatch();

  const { isLoading } = useFetchAll();

  const user = useSelector((state) => state.auth.user);
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
      dispatch(
        updateOneDoc(
          SUBJECT_COLLECTION_NAME,
          updateSubjectReducer,
          data,
          filteredData,
          user
        )
      );
    } else {
      dispatch(
        addOneDoc(
          SUBJECT_COLLECTION_NAME,
          addSubjectReducer,
          filteredData,
          user
        )
      );
    }
    dispatch(clearTimeOffReducer());
  };

  const deleteHandler = (data) => {
    dispatch(
      deleteOneDoc(SUBJECT_COLLECTION_NAME, deleteSubjectReducer, data, user)
    );
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
