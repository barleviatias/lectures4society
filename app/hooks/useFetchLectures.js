// hooks/useFetchLectures.js
import { useState, useEffect, useContext } from 'react';
import {useLecture} from './LectureContext'; // Adjust the path accordingly

const useFetchLectures = () => {
    // const lectureContext = useLecture();
    const { setLectures } = useLecture();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/lectures'); // Adjust the API endpoint URL accordingly
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setLectures(data);
                setIsLoading(false);
                localStorage.setItem('lectures', JSON.stringify(data));
                console.log("fetch from hook");
            } catch (error) {
                console.error('Error fetching lecture data:', error.message);
                setError(error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [setLectures]);

    return { isLoading, error };
};

export default useFetchLectures;