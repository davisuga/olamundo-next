import { useRouter } from "next/router";
import api from "../../services/axios";
import ReactMarkdown from "react-markdown";
import { NextButton } from "../../styles/pages/worlds";
type ExerciseProperties = {
    url: string;
    id: string;
    title: string;
    description: string;
};
const Exercise = ({ content, exercise }) => {
    const router = useRouter();
    return (
        <div>
            <ReactMarkdown className="exercise" children={content} />
            <NextButton onClick={() => router.push("/exercise")}>
                Próximo
            </NextButton>
        </div>
    );
};
export const getStaticPaths = async () => {
    const res = await api.get("/exercise");
    const exercises = res.data;
    console.log(`exercises: `, exercises);
    const paths = exercises.map((exercise: ExerciseProperties) => ({
        params: { world: JSON.stringify(exercise.id) },
    }));
    return { paths, fallback: true };
};

export const getStaticProps = async ({ params }) => {
    const res = await api.get(`/exercise?id=${params.world}`);
    const exercise = res.data;
    const contentRes = await fetch(
        `https://raw.githubusercontent.com/davisuga/olamundo-exercises/master/exercise${params.world}.md`
    );
    const content = await contentRes.text();
    console.log(content);
    return { props: { content, exercise } };
};
export default Exercise;
