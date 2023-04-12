import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { quizSlice } from "./quiz.slice";
import { taskSlice } from "./task.slice";

const reducer = combineReducers({
  [quizSlice.name]: quizSlice.reducer,
  [taskSlice.name]: taskSlice.reducer,
});

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
