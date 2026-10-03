import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./postslice";

export const store = configureStore({
  reducer: {
    posts: postReducer,
  },
});
