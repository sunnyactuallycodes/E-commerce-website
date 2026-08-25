
import { useState } from "react";
import SearchContext from "./SearchContext";

const SearchContextProvider = ({children})=>{
    const [searchOn, setSearchOn]= useState(false);

    return(
        <SearchContext.Provider value={{searchOn, setSearchOn}}>
            {children}
        </SearchContext.Provider>
    )
};
export default SearchContextProvider;