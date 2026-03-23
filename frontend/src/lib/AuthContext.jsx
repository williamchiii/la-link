import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({children}){
    const [user, setUserState] = useState(() => {
        const stored = localStorage.getItem("user");
        return stored ? JSON.parse(stored) : null;
    });

    const [credential, setCredential] = useState(() => {
        return localStorage.getItem("credential") || null;
    });

    const setUser = (newUser, newCredential = null) => {
        setUserState(newUser);
        if (newUser){
            localStorage.setItem("user", JSON.stringify(newUser));
            if (newCredential){
                localStorage.setItem("credential", newCredential)
                setCredential(newCredential)
            }
        } else{
            localStorage.removeItem("user")
            localStorage.removeItem("credential")
            setCredential(null)
        }
    }

    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value = {{user, setUser, logout, credential}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext)