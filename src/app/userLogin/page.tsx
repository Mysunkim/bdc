"use client"; 
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TextField, Button, Typography, Container } from '@mui/material';
const userLogin = () => {
    const [data, setData] = useState<string | null>(null);
    const router = useRouter();
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
    //로그인하는함수

    // 페이지 이동 처리 함수
    const userFormToMove = () => {
        router.push('/userLogin/InputForm');  // 회원가입 페이지로 이동
    };
    return (
        <div>
            <Container maxWidth="xs">
            <Typography variant="h4" component="h1" gutterBottom>
                会員ログイン
            </Typography>
            <form>
                <TextField
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="userid"
                    label="id"
                    placeholder="abcde@gmail.com"
                    sx={{ opacity: 1 }} 
                />
                <TextField
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="userpassword"
                    label="Password"
                    type="password"
                    placeholder="1234!@#ab"
                    sx={{ opacity: 0.8 }} 
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
        </Container>
        <Container maxWidth="xs">
            <Typography variant="h4" component="h1" gutterBottom>
            </Typography>
                <Button 
                    type="submit" 
                    variant="contained" 
                    color="secondary" 
                    fullWidth
                    onClick={userFormToMove} 
                >
                    新規登録
                </Button>
        </Container>
        </div>
    );
};

export default userLogin;