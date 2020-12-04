import { useRouter } from "next/router";
import api from "../../../../services/axios";
import ReactMarkdown from "react-markdown";
import { NextButton } from "../../../../styles/pages/worlds";
import Link from "next/link";

type LessonProperties = {
    url: string;
    id: string;
    worldId: string;

    title: string;
    description: string;
};
const Lesson = ({ content, lesson, exercises }) => {
    const router = useRouter();
    return (
        <div>
            {/* <ReactMarkdown className="lesson" children={content} />
            <NextButton onClick={() => router.push(`/exercises/${lesson.id}`)}>
                Próximo
            </NextButton> */}
            {JSON.stringify(lesson)}
            <br />
            Exercícios:
            {exercises &&
                exercises.map((exercise) => (
                    <Link
                        href={{
                            pathname: "/exercises/[exercise]",
                            query: {
                                exercise: exercise.id,
                            },
                        }}
                    >
                        <NextButton>{exercise.title}</NextButton>
                    </Link>
                ))}
        </div>
    );
};

export const getStaticPaths = async () => {
    const res = await api.get("/lesson");
    const lessons = res.data;
    console.log(`lessons: `, lessons);
    const paths = lessons.map((lesson: LessonProperties) => ({
        params: {
            lesson: JSON.stringify(lesson.id),
            world: JSON.stringify(lesson.worldId),
        },
    }));
    return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
    const res = await api.get(`/lesson?id=${params.lesson}`);
    const lesson = res.data;
    console.log("lesson inside getStaticProps :", lesson, params.world);
    const contentRes = await fetch(
        `https://raw.githubusercontent.com/davisuga/olamundo-lessons/master/lesson${params.world}.md`
    );
    const exercisesRes = await api.get(`/exercise?lessonId=${lesson.id}`);
    const exercises = exercisesRes.data;
    const content = await contentRes.text();
    return { props: { content, lesson, exercises } };
};

export default Lesson;
