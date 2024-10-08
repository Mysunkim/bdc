"use client"; 
import { useEffect, useState } from 'react';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { useRouter } from 'next/navigation';
const ClientUserName = () => {
    const [username, setUsername] = useState<string | null>(null);
    const [userId, setUuserId] = useState<string | null>(null);
    const router = useRouter();
    useEffect(() => {
        const storedToken = localStorage.getItem('token');

        async function fetchUsername() {
            if (storedToken) {
                try {
                    const decodedToken = jwt.decode(storedToken) as JwtPayload | null;
                    

                    if (decodedToken && typeof decodedToken === 'object' && decodedToken.username) {
                        setUsername(decodedToken.username); // username을 사용
                        setUuserId(decodedToken.userId); 
                    } else {
                        console.log("username not found in decoded token or decodedToken is null");
                    }
                } catch (error) {
                    console.error("Failed to decode token", error);
                }
            } else {
                console.log("No token found");
            }
        }

        fetchUsername();
    }, []);
    
    const handleLogout = async () => {
        try {
            const response = await fetch('/api/logoutfnc', {
                method: 'POST',
            });

            if (response.ok) {
                // 로컬 스토리지에서 토큰 삭제
                localStorage.removeItem('token');
                alert('ログアウトしました！！');
                setUsername(null); // 사용자 이름 초기화
            } else {
                console.error("Failed to log out");
            }
        } catch (error) {
            console.error("An error occurred while logging out", error);
        }
    };

    const updateHandleLogout = async () => {
        router.push(`/users/update/${userId}`);
    };
    return (
        <div>
            <span>{username ? `Welcome, ${username}!` : "Please log in."}</span>
            {username && <button onClick={handleLogout}>Logout</button>} {/* 로그인한 경우에만 로그아웃 버튼 표시 */}
            {username && <button onClick={updateHandleLogout}>Edit</button>}
        </div>
    );
};

export default ClientUserName;