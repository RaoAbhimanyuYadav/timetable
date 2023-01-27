// import { configureStore } from "@reduxjs/toolkit";
// import { reducers } from "./reducers";

// export const store =    configureStore({ reducer: reducers });

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import classroomReducers from "./reducers/classroomReducers";
import commonReducers from "./reducers/commonReducers";
import lessonReducer from "./reducers/lessonReducer";
import profileReducer from "./reducers/profileReducer";
import semesterReducer from "./reducers/semesterReducer";
import subjectReducer from "./reducers/subjectReducer";
import teacherReducers from "./reducers/teacherReducers";

export default configureStore({
  reducer: {
    profile: profileReducer,
    subject: subjectReducer,
    common: commonReducers,
    semester: semesterReducer,
    classroom: classroomReducers,
    teacher: teacherReducers,
    auth: authReducer,
    lesson: lessonReducer,
  },
});
