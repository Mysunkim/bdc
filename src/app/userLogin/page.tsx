"use client"; 
import { useEffect, useState } from 'react';
const Home = () => {
    const [data, setData] = useState<string | null>(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/data');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result.message);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1 className="title">userLogin</h1>
            {/*message가 세팅되는자리 */}
            <p className="title-sub">{data ? data : 'Loading...'}</p>
        </div>
    );
};

export default Home;