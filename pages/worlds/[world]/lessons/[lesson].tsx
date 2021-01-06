import { useRouter } from "next/router";
import api from "../../../../services/axios";
import ReactMarkdown from "react-markdown";
import { NextButton } from "../../../../styles/pages/worlds";
import Link from "next/link";
import { getLesson } from "../../../../utils/getLessons";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@chakra-ui/react";
type LessonPage = {
  lesson: Lesson;
  exercises: Exercise[];
};
const Lesson = ({ lesson, exercises }: LessonPage) => {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "SET_LESSON", lesson: lesson.id });
  }, []);
  return (
    <div>
      <div
        className="lesson"
        dangerouslySetInnerHTML={{ __html: lesson.content }}
      />
      <br />
      Exercícios:
      <Link
        href={{
          pathname: "/exercises/[exercise]",
          query: {
            exercise: lesson.id,
          },
        }}
      >
        <Button>{exercises[0].title}</Button>
      </Link>
    </div>
  );
};

export const getStaticPaths = async () => {
  const res = await api.get("/lesson");
  const lessons = res.data;
  console.log(`lessons: `, lessons);
  const paths = lessons.map((lesson: Lesson) => ({
    params: {
      lesson: JSON.stringify(lesson.id),
      world: JSON.stringify(lesson.worldId),
    },
  }));
  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
  const res = await api.get<Lesson>(`/lesson?id=${params.lesson}`);
  const lesson = res.data;
  console.log("lesson inside getStaticProps :", lesson, params.world);
  const { htmlContent } = getLesson(lesson.url);
  const lessonWithContent = {
    ...lesson,
    content: htmlContent,
  };
  const exercisesRes = await api.get(`/exercise?lessonId=${lesson.id}`);
  const exercises = exercisesRes.data;

  return { props: { lesson: lessonWithContent, exercises } };
};

export default Lesson;
