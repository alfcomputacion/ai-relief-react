import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({children})=>{
    const [auth, setAuth] = useState({});
    const [success, setSuccess]= useState(false);

    return (
        <AuthContext.Provider value={({auth, setAuth, success, setSuccess})}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;