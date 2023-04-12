import Input from "@/app/components/input";
import QuestionCard from "@/app/components/question-card";
import useNewQuiz from "@/app/hooks/useNewQuiz";
import { Task } from "@/app/types";
import { useState } from "react";

export default function AddQuiz() {
  const {
    quiz,
    setAuthor,
    setName,
    task,
    addAnswer,
    setAnswer,
    setQuestion,
    removeAnswer,
    removeQuestion,
    saveTask,
    saveQuiz,
  } = useNewQuiz();

  return (
    <div>
      <Input
        label="Título"
        value={quiz.name}
        onChange={({ target }) => setName(target.value)}
      />
      <Input
        label="Autor"
        value={quiz.author}
        onChange={({ target }) => setAuthor(target.value)}
      />
      <Input
        label="Pregunta"
        value={task.question}
        onChange={({ target }) => setQuestion(target.value)}
      />
      <Input
        label="Respuesta correcta"
        value={task.answers[0]}
        onChange={({ target }) => setAnswer(0, target.value)}
      />
      {task.answers.slice(1).map((answer, index) => (
        <div key={index}>
          <Input
            value={answer}
            onChange={({ target }) => setAnswer(index + 1, target.value)}
          />
          <button onClick={() => removeAnswer(index + 1)}>Borrar</button>
        </div>
      ))}
      <button onClick={addAnswer}>Agregar Respuesta</button>
      <button onClick={saveTask}>Guardar pregunta</button>
      {quiz.questions.map((question, index) => (
        <QuestionCard
          key={index}
          task={question}
          onDelete={() => removeQuestion(index)}
        />
      ))}
      <button onClick={saveQuiz}>Guardar</button>
    </div>
  );
}
