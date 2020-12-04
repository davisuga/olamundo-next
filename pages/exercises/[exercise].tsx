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
    console.log("exercise: ", exercise);

    return (
        <div>
            <ReactMarkdown className="exercise" children={content} />
            {exercise.choices.map((choice) => (
                <div>
                    <input type="checkbox" />
                    {choice}
                </div>
            ))}
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
        params: { exercise: JSON.stringify(exercise.id) },
    }));
    return { paths, fallback: true };
};

export const getStaticProps = async ({ params }) => {
    console.log("the params: ", params);
    const res = await api.get(`/exercise?id=${params.exercise}`);
    const exercise = res.data;
    try {
        const contentRes = await fetch(exercise.url);
        const content = await contentRes.text();
        console.log(content);
        return { props: { content, exercise } };
    } catch (err) {
        return { props: { content: {}, exercise } };
    }
};
export default Exercise;
