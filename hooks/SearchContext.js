'use client'
import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
    const [searchObj, setSearchObj] = useState({ name: '', tags: new Set() });

    return (
        <SearchContext.Provider value={{ searchObj, setSearchObj }}>
            {children}
        </SearchContext.Provider>
    );
};
