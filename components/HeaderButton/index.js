import React, { useEffect, useState } from "react";

import { Button } from "./styles";
export default function HeaderButton({ ...props }) {
    const [logged, setLogged] = useState(false);
    useEffect(() => {
        const isLogged = JSON.parse(localStorage.getItem("logged"));

        setLogged(logged);
    }, []);

    return (
        <Button
            onClick={() => {
                if (logged) {
                    localStorage.setItem("logged", "false");
                    window.location = "/";
                } else {
                    window.location = "login";
                }
            }}
            {...props}
        >
            {logged ? "SAIR" : "ENTRAR"}
        </Button>
    );
}
