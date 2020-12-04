import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import BotãoMundo from "../../../components/BotãoMundo";
import Input from "../../../components/Input";
import api from "../../../services/axios";
import Link from "next/link";

type LessonProperties = {
    title: string;
    url: string;
    description: string;
    id: string;
    worldId: number;
};

type Props = {
    worlds: LessonProperties[];
};

function Lessons({ lessons }: Props) {
    const router = useRouter();

    console.log("lessons inside the component: ", lessons);
    return (
        <div>
            {lessons &&
                lessons.map((lesson) => {
                    return (
                        <Link
                            href={{
                                pathname: "/worlds/[world]/lessons/[lesson]",
                                query: {
                                    world: lessons[0].worldId,
                                    lesson: lesson.id,
                                },
                            }}
                        >
                            <BotãoMundo
                                key={lesson.id}
                                // onClick={() => {
                                //     router.push("/worlds/" + lesson.id);
                                // }}
                                texto={lesson.title}
                            />
                        </Link>
                    );
                })}
            <button
                onClick={(e) => {
                    localStorage.setItem("logged", "false");
                    router.push("/");
                }}
            >
                Logout
            </button>
        </div>
    );
}

export const getStaticProps: GetStaticProps = async (context) => {
    console.log("searching for lessons...");
    const lessons = await api.get(`/world?id=${context.params.world}`);

    return { props: { lessons: lessons.data } };
};
export const getStaticPaths = async (context) => {
    console.log();
    const res = await api.get("/world");
    const worlds = res.data;
    console.log(`worlds: `, worlds);
    const paths = worlds.map((lesson: LessonProperties) => ({
        params: { world: JSON.stringify(lesson.id) },
    }));
    return { paths, fallback: false };
};

export default Lessons;

// function Page({ stars }) {
//     return <div>Next stars: {stars}</div>;
// }

// Page.getInitialProps = async (ctx) => {
//     const res = await fetch("https://api.github.com/repos/vercel/next.js");
//     const json = await res.json();
//     return { stars: json.stargazers_count };
// };

// export default Page;
