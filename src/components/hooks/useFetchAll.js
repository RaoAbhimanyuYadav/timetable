import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CLASSROOM_COLLECTION_NAME } from "../constants/classroomConstants";
import {
  timingCollectionName,
  workingDayCollectionName,
} from "../constants/profileConstants";
import { SEMESTER_COLLECTION_NAME } from "../constants/semesterConstant";
import { SUBJECT_COLLECTION_NAME } from "../constants/subjectCostant";
import { TEACHER_COLLECTION_NAME } from "../constants/teacherConstant";
import { getAllDocs } from "../redux/actionThunk/firebaseThunk";
import { setClassroomReducer } from "../redux/reducers/classroomReducers";
import {
  setTimingReducer,
  setWorkingDaysReducer,
} from "../redux/reducers/profileReducer";
import { setSemesterReducer } from "../redux/reducers/semesterReducer";
import { setSubjectReducer } from "../redux/reducers/subjectReducer";
import { setTeacherReducer } from "../redux/reducers/teacherReducers";

const useFetchAll = () => {
  const dispatch = useDispatch();

  const dataFetched = useSelector((state) => state.auth.dataFetched);
  const user = useSelector((state) => state.auth.user);

  const [isLoading, setIsLoading] = useState(!dataFetched);

  useEffect(() => {
    if (!dataFetched)
      dispatch(
        getAllDocs(
          [
            timingCollectionName,
            workingDayCollectionName,
            SUBJECT_COLLECTION_NAME,
            SEMESTER_COLLECTION_NAME,
            CLASSROOM_COLLECTION_NAME,
            TEACHER_COLLECTION_NAME,
          ],
          [
            setTimingReducer,
            setWorkingDaysReducer,
            setSubjectReducer,
            setSemesterReducer,
            setClassroomReducer,
            setTeacherReducer,
          ],
          setIsLoading,
          user
        )
      );
  }, [dispatch, dataFetched, user]);

  return {
    isLoading,
  };
};

export default useFetchAll;
