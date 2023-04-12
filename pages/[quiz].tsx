import { Quiz as QuizType } from "@/app/types";
import { readFile, readdir } from "fs/promises";
import path from "path";

export interface IQuizProps{
    quiz: QuizType
}

export default function Quiz({quiz}: IQuizProps) {
  return <div>{JSON.stringify(quiz)}</div>;
}

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}

export async function getStaticProps(context: any) {
  const id = context.params.quiz;
  const dir = path.join("./public", "quiz");
  const quizesMeta = await readdir(dir);
  const quizPath = quizesMeta.find((meta) => meta.startsWith(id));
  if (!quizPath) {
    return { notFound: true };
  }
  const json = await readFile(path.join(dir, quizPath));
  return { props: { quiz: JSON.parse(json.toString()) } };
}
