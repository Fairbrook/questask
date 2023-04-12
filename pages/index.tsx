import { QuizList } from "@/app/types";
import { readdir } from "fs/promises";
import { useRouter } from "next/router";
import path from "path";

export interface IHomeProps {
  quizList: QuizList;
}

export default function Home({ quizList }: IHomeProps) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      {quizList.map((item) => (
        <div
          key={item.id}
          onClick={() =>
            router.push({ pathname: "/[quiz]", query: { quiz: item.id } })
          }
        >
          <div>{item.title}</div>
          <div>{item.author}</div>
        </div>
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const dir = path.join("./public", "quiz");
  const quizesMeta = await readdir(dir);
  const quizList = quizesMeta.map((meta) => {
    const [id, title, author] = meta.split(".")[0].split(":");
    return { title, author, id };
  });
  return {
    // Passed to the page component as props
    props: { quizList },
    revalidate: 3600,
  };
}
