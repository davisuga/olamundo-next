import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [auth, setAuth] = useState(false);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    //if (!context) throw new Error("useAuth must be used within a AuthProvider");
    const { auth, setAuth } = context;
    return { auth, setAuth };
}
