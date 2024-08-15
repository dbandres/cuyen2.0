import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [userdata, setUserData] = useState({
        jwt: "",
        nombre: "",
        apellido: "",
        email: "",
        usuario: "",
        telefono: "",
        contrato: "",
        rol: "",
        id: ''
    });

    return (
        <UserContext.Provider value={{ userdata, setUserData }}>
            {children}
        </UserContext.Provider>
    )
}