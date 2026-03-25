import { Children, createContext } from "react";


export const UseContext=createContext()

export const CreateContext=()=>{

    const url="sjbdvjk"
    return(
    <UseContext.Provider value={url}>
        {Children}
    </UseContext.Provider>
    )
}