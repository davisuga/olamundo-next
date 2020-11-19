import React, { useEffect, useState } from "react";
import BotãoMundo from "../components/BotãoMundo";
import Input from "../components/Input";

function Worlds() {
    const fetchWorlds = async () => {
        console.log("searching for lessons...");
        const worlds = await fetch("http://localhost:5000/lesson", {
            mode: "no-cors",
        });
    };

    useEffect(() => {
        fetchWorlds();
    }, []);
    return (
        <div>
            <BotãoMundo texto="Introdução à programação" />
            <BotãoMundo texto="Tipos de dados" />
            <BotãoMundo texto="Controle de fluxo" />
            <button
                onClick={(e) => {
                    localStorage.setItem("logged", "false");
                    window.location = "/";
                }}
            >
                Logout
            </button>
        </div>
    );
}

export default Worlds;
