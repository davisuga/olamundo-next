import { useRouter } from "next/router";
import api from "../../services/axios";
import ReactMarkdown from "react-markdown";
import { NextButton } from "../../styles/pages/worlds";
type LessonProperties = {
    url: string;
    id: string;
    title: string;
    description: string;
};
const Lesson = ({ content, lesson }) => {
    const router = useRouter();
    return (
        <div>
            {" "}
            <ReactMarkdown className="lesson" children={content} />
            <NextButton onClick={() => router.push("/exercise")}>
                Próximo
            </NextButton>{" "}
        </div>
    );
};
export const getStaticPaths = async () => {
    const res = await api.get("/lesson");
    const lessons = res.data;
    console.log(`lessons: `, lessons);
    const paths = lessons.map((lesson: LessonProperties) => ({
        params: { world: JSON.stringify(lesson.id) },
    }));
    return { paths, fallback: true };
};

export const getStaticProps = async ({ params }) => {
    const res = await api.get(`/lesson?id=${params.world}`);
    const lesson = res.data;
    const contentRes = await fetch(
        `https://raw.githubusercontent.com/davisuga/olamundo-lessons/master/lesson${params.world}.md`
    );
    const content = await contentRes.text();
    console.log(content);
    return { props: { content, lesson } };
};
export default Lesson;
