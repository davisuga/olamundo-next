import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "./styles";
export default function HeaderButton({ ...props }) {
    const [logged, setLogged] = useState(false);
    const router = useRouter();
    useEffect(() => {
        const isLogged = JSON.parse(localStorage.getItem("logged"));

        setLogged(logged);
    }, []);

    return (
        <Button
            onClick={() => {
                if (logged) {
                    localStorage.setItem("logged", "false");
                    router.push("/");
                } else {
                    router.push("/login");
                }
            }}
            {...props}
        >
            {logged ? "SAIR" : "ENTRAR"}
        </Button>
    );
}
