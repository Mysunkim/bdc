"use client"; 
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TextField, Button, Typography, Container } from '@mui/material';
import Cookies from 'js-cookie';

const UserLogin = () => {
    const [userId, setUserId] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [message, setMessage] = useState<string | null>(null);
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(false);
    const [error, setError] = useState('');
    const [token, setToken] = useState(''); // 토큰 상태
    // 토큰 저장 함수
    const saveTokenToCookie = (token : string) => {
        Cookies.set('token', token, { expires: 7 });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // 기본 제출 동작 방지
        try {
            const response = await fetch('/api/loginfnc', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ member_id: userId, password: userPassword }),
            });

            // response.ok를 먼저 확인하고 에러 처리를 위해 다른 경로로 나뉘게 처리
            if (response.ok) {
                const data = await response.json(); // 여기서 JSON 파싱
                // JWT 토큰을 localStorage에 저장
                //localStorage.setItem('token', data.token);
                saveTokenToCookie(data.token);
                // 로그인 성공 시 상태 업데이트
                setIsLogin(true); 
                alert('로그인 성공!');
                setMessage(data.message);

                // 리디렉션
                router.push('/'); // 대시보드로 이동 (예시)
            } else {
                const errorData = await response.json(); // 에러 응답의 JSON 파싱
                setError(errorData.error); // 오류 메시지 출력
              }
        } catch (error) {
            console.error('Error fetching data:', error);
            setMessage('Login failed. Please try again.'); // 에러 메시지 표시
        }
    };

    const usersregister = () => {
        router.push('/users/register'); // 회원가입 페이지로 이동
    };

    return (
        <div>
            <Container maxWidth="xs">
                <Typography variant="h4" component="h1" gutterBottom>
                    会員ログイン
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="userId"
                        label="ID"
                        placeholder="abcde"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)} // ID 상태 업데이트
                    />
                    <TextField
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="userPassword"
                        label="Password"
                        type="password"
                        placeholder="1234!@#ab"
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)} // 비밀번호 상태 업데이트
                    />
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        fullWidth
                    >
                    ログイン
                    </Button>
                </form>
                {message && (
                    <Typography variant="body2" color="error" align="center">
                        {message}
                    </Typography>
                )}
            </Container>
            <Container maxWidth="xs">
                <Button 
                    variant="contained" 
                    color="secondary" 
                    fullWidth
                    onClick={usersregister} 
                >
                新規登録
                </Button>
            </Container>
        </div>
    );
};

export default UserLogin;
