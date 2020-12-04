import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import BotãoMundo from "../../components/BotãoMundo";
import Input from "../../components/Input";
import api from "../../services/axios";

type WorldProperties = {
    name: string;
    url: string;
    description: string;
    id: string;
};

type Props = {
    worlds: WorldProperties[];
};

function Worlds({ worlds }: Props) {
    const router = useRouter();
    console.log("worlds inside the component: ", worlds);
    return (
        <div>
            {worlds &&
                worlds.map((world) => {
                    return (
                        <BotãoMundo
                            key={world.id}
                            onClick={() => {
                                router.push("/worlds/" + world.id);
                            }}
                            texto={world.name}
                        />
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

export const getStaticProps = async (context) => {
    console.log("searching for lessons...");
    const worlds = await api.get("/world");

    return { props: { worlds: worlds.data } };
};
export default Worlds;

// function Page({ stars }) {
//     return <div>Next stars: {stars}</div>;
// }

// Page.getInitialProps = async (ctx) => {
//     const res = await fetch("https://api.github.com/repos/vercel/next.js");
//     const json = await res.json();
//     return { stars: json.stargazers_count };
// };

// export default Page;
