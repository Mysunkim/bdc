"use client"; 
import { useEffect, useState } from 'react';
import RootLayout from './layout';
const Home = () => {

    const [username, setUsername] = useState<string | null>(null); // 사용자 이름을 저장할 상태 추가
    
    useEffect(() => {
        // 컴포넌트가 마운트될 때 로컬스토리지에서 토큰을 가져와 사용자 이름 설정
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            const decodedToken = JSON.parse(atob(storedToken.split('.')[1]));
            console.log("Decoded Token:", decodedToken); // 디코드된 토큰 로그
            setUsername(decodedToken.username); // 사용자 이름 상태 업데이트
        }
    }, []); 
    console.log("Rendering Home with username:", username); 
    return (
        <RootLayout username={username}> {/* 사용자 이름을 레이아웃에 전달 */}
            <div>
                <img src="/image/mainpage-bg.png" />
                <h1 className="title">Welcome to the Next.js App</h1>
            </div>
        </RootLayout>
    );
};

export default Home;