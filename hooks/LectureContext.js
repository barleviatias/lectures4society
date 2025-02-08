'use client'
import React, { createContext, useContext, useState } from 'react';

const LectureContext = createContext();

export const useLecture = () => useContext(LectureContext);

export const LectureProvider = ({ children }) => {
    const [lectures, setLectures] = useState([]);

    return (
        <LectureContext.Provider value={{ lectures, setLectures }}>
            {children}
        </LectureContext.Provider>
    );
};
