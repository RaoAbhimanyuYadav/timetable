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

  const profileData = useSelector((state) => state.profile);
  const subjectData = useSelector((state) => state.subject);
  const semesterData = useSelector((state) => state.semester);
  const classroomData = useSelector((state) => state.classroom);
  const teacherData = useSelector((state) => state.teacher);

  const [isLoadingWorkingDays, setIsLoadingWorkingDays] = useState(
    !profileData.isWorkingDaysFetched
  );
  const [isLoadingBellTimings, setIsLoadingBellTimings] = useState(
    !profileData.isBellTimingsFetched
  );
  const [isLoadingSubject, setIsLoadingSubject] = useState(
    !subjectData.isSubjectsFetched
  );
  const [isLoadingSemester, setIsLoadingSemester] = useState(
    !semesterData.isSemestersFetched
  );
  const [isLoadingClassroom, setIsLoadingClassroom] = useState(
    !classroomData.isClassroomsFetched
  );
  const [isLoadingTeacher, setIsLoadingTeacher] = useState(
    !teacherData.isTeachersFetched
  );

  useEffect(() => {
    if (profileData.isBellTimingsFetched === false)
      dispatch(
        getAllDocs(
          timingCollectionName,
          setTimingReducer,
          setIsLoadingBellTimings
        )
      );

    if (profileData.isWorkingDaysFetched === false)
      dispatch(
        getAllDocs(
          workingDayCollectionName,
          setWorkingDaysReducer,
          setIsLoadingWorkingDays
        )
      );

    if (subjectData.isSubjectsFetched === false)
      dispatch(
        getAllDocs(
          SUBJECT_COLLECTION_NAME,
          setSubjectReducer,
          setIsLoadingSubject
        )
      );

    if (semesterData.isSemestersFetched === false)
      dispatch(
        getAllDocs(
          SEMESTER_COLLECTION_NAME,
          setSemesterReducer,
          setIsLoadingSemester
        )
      );

    if (classroomData.isClassroomsFetched === false)
      dispatch(
        getAllDocs(
          CLASSROOM_COLLECTION_NAME,
          setClassroomReducer,
          setIsLoadingClassroom
        )
      );

    if (teacherData.isTeachersFetched === false)
      dispatch(
        getAllDocs(
          TEACHER_COLLECTION_NAME,
          setTeacherReducer,
          setIsLoadingTeacher
        )
      );
  }, [dispatch, subjectData, profileData, semesterData, teacherData]);

  return {
    isLoadingWorkingDays,
    isLoadingBellTimings,
    isLoadingSubject,
    isLoadingSemester,
    isLoadingClassroom,
    isLoadingTeacher,
    all:
      isLoadingWorkingDays &&
      isLoadingBellTimings &&
      isLoadingSubject &&
      isLoadingClassroom &&
      isLoadingSemester &&
      isLoadingTeacher,
  };
};

export default useFetchAll;
