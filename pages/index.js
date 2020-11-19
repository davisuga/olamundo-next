import Home from "./_home";
import { useAuth } from "../context/auth";
import { useRouter } from "next/router";

export default function App() {
    const { auth } = useAuth();
    const router = useRouter();
    return (
        <>
            {!auth && <Home />}
            {auth && router.replace("/worlds")}
        </>
    );
}
