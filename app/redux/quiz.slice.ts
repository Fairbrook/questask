import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Quiz, Task } from "../types";
import type { RootState } from ".";

const initialState: Quiz = {
  author: "",
  name: "",
  questions: [],
};

export const quizSlice = createSlice({
  initialState,
  name: "quiz",
  reducers: {
    set(state, action: PayloadAction<Quiz>) {
      return action.payload;
    },
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setAuthor(state, action: PayloadAction<string>) {
      state.author = action.payload;
    },
    addQuestion(state, action: PayloadAction<Task>) {
      state.questions.push(action.payload);
    },
    rmQuestion(state, action: PayloadAction<{ index: number }>) {
      state.questions.splice(action.payload.index, 1);
    },
  },
});

export const QuizActions = quizSlice.actions;
export const quizSelector = (state: RootState) => state[quizSlice.name];
