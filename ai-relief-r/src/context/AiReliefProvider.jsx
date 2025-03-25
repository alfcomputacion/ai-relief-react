import { createContext, useState } from "react";

const AiReliefContext = createContext({});

export const AiReliefProvider = ({children})=>{
    const [aiResponse, setAiResponse] = useState({});

    return (
        <AiReliefContext.Provider value={{aiResponse, setAiResponse}}>
            {children}
        </AiReliefContext.Provider>
    )
}

export default AiReliefContext;