import { useRouter } from "next/router";
import api from "../../../../services/axios";
import Link from "next/link";
import { getLesson } from "../../../../utils/getLessons";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button, Box } from "@chakra-ui/react";
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
    <Box m={[5, 12, 32]}>
      <Box
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
    </Box>
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
  const lessonId = params.lesson;

  const lessonPromise = api.get<Lesson>(`/lesson?id=${params.lesson}`);
  const exercisesPromise = api.get(`/exercise?lessonId=${lessonId}`);

  const [lessonResponse, exercisesResponse] = await Promise.all([
    lessonPromise,
    exercisesPromise,
  ]);

  const lessonData = lessonResponse.data;
  const exercises = exercisesResponse.data;

  const { htmlContent } = getLesson(lessonData.url);
  const lessonWithContent = {
    ...lessonData,
    content: htmlContent,
  };

  return { props: { lesson: lessonWithContent, exercises } };
};

export default Lesson;
