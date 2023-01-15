// import { configureStore } from "@reduxjs/toolkit";
// import { reducers } from "./reducers";

// export const store =    configureStore({ reducer: reducers });

import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./reducers/profileReducer";

export default configureStore({
  reducer: {
    profile: profileReducer,
  },
});
