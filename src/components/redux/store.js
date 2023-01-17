// import { configureStore } from "@reduxjs/toolkit";
// import { reducers } from "./reducers";

// export const store =    configureStore({ reducer: reducers });

import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./reducers/profileReducer";
import subjectReducer from "./reducers/subjectReducer";

export default configureStore({
  reducer: {
    profile: profileReducer,
    subject: subjectReducer,
  },
});
