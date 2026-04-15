import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({children}){
    const [user, setUserState] = useState(() => {
        const stored = sessionStorage.getItem("user");
        return stored ? JSON.parse(stored) : null;
    });

    const [credential, setCredential] = useState(() => {
        return sessionStorage.getItem("credential") || null;
    });

    const setUser = (newUser, newCredential = null) => {
        setUserState(newUser);
        if (newUser){
            sessionStorage.setItem("user", JSON.stringify(newUser));
            if (newCredential){
                sessionStorage.setItem("credential", newCredential)
                setCredential(newCredential)
            }
        } else{
            sessionStorage.removeItem("user")
            sessionStorage.removeItem("credential")
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