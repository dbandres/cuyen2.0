import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({children}){
    const [authenticate, setAuthenticate] = useState(false);

    return(
        <AuthContext.Provider value={{authenticate, setAuthenticate}}>
            {children}
        </AuthContext.Provider>
    )
}