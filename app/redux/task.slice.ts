import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Task } from "../types";
import type { RootState } from ".";

const initialState: Task = {
  question: "",
  answers: Array(4).fill(""),
  correct_index: 0,
};

export const taskSlice = createSlice({
  initialState,
  name: "task",
  reducers: {
    clear() {
      return initialState;
    },
    set(state, action: PayloadAction<Task>) {
      return action.payload;
    },
    setQuestion(state, action: PayloadAction<string>) {
      state.question = action.payload;
    },
    addAnswer(state, action: PayloadAction<string>) {
      state.answers.push(action.payload);
    },
    rmAnswer(state, action: PayloadAction<{ index: number }>) {
      state.answers.splice(action.payload.index, 1);
    },
    setAnswer(state, action: PayloadAction<{ index: number; answer: string }>) {
      const { index, answer } = action.payload;
      state.answers[index] = answer;
    },
  },
});

export const TaskActions = taskSlice.actions;
export const taskSelector = (state: RootState) => state[taskSlice.name];
