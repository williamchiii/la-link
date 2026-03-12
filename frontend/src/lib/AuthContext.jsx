import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({children}){
    const [user, setUserState] = useState(() => {
        const stored = localStorage.getItem("user");
        return stored ? JSON.parse(stored) : null;
    });

    const setUser = (newUser) => {
        setUserState(newUser);
        if (newUser){
            localStorage.setItem("user", JSON.stringify(newUser));
        } else{
            localStorage.removeItem("user")
        }
    }

    return (
        <AuthContext.Provider value = {{user, setUser}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext)