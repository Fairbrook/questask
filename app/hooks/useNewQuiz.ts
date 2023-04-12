import { useDispatch, useSelector } from "react-redux";
import { QuizActions, quizSelector } from "../redux/quiz.slice";
import { useCallback, useEffect } from "react";
import localforage from "localforage";
import { Quiz, Task } from "../types";
import { DRAFT_KEY } from "../config/app.config";
import { TaskActions, taskSelector } from "../redux/task.slice";
import { useRouter } from "next/router";

export default function useNewQuiz() {
  const quiz = useSelector(quizSelector);
  const task = useSelector(taskSelector);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    localforage.getItem<Quiz>(DRAFT_KEY).then((draft) => {
      if (!draft) return;
      dispatch(QuizActions.set(draft));
    });
  }, [dispatch]);

  const addQuestion = useCallback(
    (question: Task) => {
      localforage.setItem(DRAFT_KEY, {
        ...quiz,
        questions: [...quiz.questions, question],
      });
      dispatch(QuizActions.addQuestion(question));
    },
    [dispatch, quiz]
  );

  const setName = useCallback(
    (name: string) => {
      localforage.setItem(DRAFT_KEY, { ...quiz, name });
      dispatch(QuizActions.setName(name));
    },
    [dispatch, quiz]
  );

  const setAuthor = useCallback(
    (author: string) => {
      localforage.setItem(DRAFT_KEY, { ...quiz, author });
      dispatch(QuizActions.setAuthor(author));
    },
    [dispatch, quiz]
  );

  const removeQuestion = useCallback(
    (index: number) => {
      const copy = { ...quiz };
      copy.questions = [...copy.questions];
      copy.questions.splice(index, 1);
      localforage.setItem(DRAFT_KEY, copy);
      dispatch(QuizActions.rmQuestion({ index }));
    },
    [dispatch, quiz]
  );

  const setQuestion = useCallback(
    (question: string) => {
      dispatch(TaskActions.setQuestion(question));
    },
    [dispatch]
  );

  const addAnswer = useCallback(() => {
    dispatch(TaskActions.addAnswer(""));
  }, [dispatch]);

  const removeAnswer = useCallback(
    (index: number) => {
      dispatch(TaskActions.rmAnswer({ index }));
    },
    [dispatch]
  );

  const setAnswer = useCallback(
    (index: number, answer: string) => {
      dispatch(TaskActions.setAnswer({ index, answer }));
    },
    [dispatch]
  );

  const saveTask = useCallback(() => {
    addQuestion(task);
    dispatch(TaskActions.clear());
  }, [task, addQuestion, dispatch]);

  const saveQuiz = useCallback(async () => {
    const res = await fetch("api/quiz", {
      method: "POST",
      body: JSON.stringify(quiz),
    });
    const id = await res.text();
    await localforage.removeItem(DRAFT_KEY);
    router.push({ pathname: "/[quiz]", query: { quiz: id } });
  }, [quiz, router]);

  return {
    saveQuiz,
    saveTask,
    quiz,
    addQuestion,
    setName,
    setAuthor,
    removeQuestion,
    task,
    addAnswer,
    setQuestion,
    removeAnswer,
    setAnswer,
  };
}
