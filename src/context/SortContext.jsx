import { createContext, useState } from "react";

export const SortContext = createContext();

export const SortProvider = ({children}) => {
    const [sortValue, setSortValue] = useState("");

    return(
        <SortContext.Provider value={{sortValue, setSortValue}}>
            {children}
        </SortContext.Provider>
    )
}