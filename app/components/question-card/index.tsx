import { Task } from "@/app/types";

export interface IQuestionCardProps {
  className?: string;
  task: Task;
  onDelete?: () => any;
}

export default function QuestionCard({
  task,
  className,
  onDelete,
}: IQuestionCardProps) {
  return (
    <div className={className}>
      <div>{task.question}</div>
      {task.answers.map((answer, index) => (
        <div key={index}>{answer}</div>
      ))}
      <button onClick={onDelete}>Eliminar</button>
    </div>
  );
}
