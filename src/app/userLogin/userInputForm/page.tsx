"use client"; 
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TextField, Button, Typography, Container } from '@mui/material';
const create = () => {
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
    const userFormToHome = () => {
        alert('Welcome to OurClub');
        router.push('/');  // 홈으로이동
    };
    return (
        <div>
            <Container maxWidth="xs">
            <Typography variant="h4" component="h1" gutterBottom>
                新規登録
            </Typography>
            <form>
                <TextField
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="userid"
                    label="お名前"
                    placeholder="わかなひろゆし"
                    sx={{ opacity: 1 }} 
                />
                <TextField
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="パスワード"
                    label="Password"
                    type="password"
                    placeholder="1234!@#ab"
                    sx={{ opacity: 0.8 }} 
                />
                <TextField
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="useremail"
                    label="メール"
                    placeholder="abcde@gmail.com"
                    sx={{ opacity: 1 }} 
                />
                <TextField
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="userphone"
                    label="電話番号"
                    type="電話番号"
                    placeholder="09012340000"
                    sx={{ opacity: 0.8 }} 
                />
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
                    onClick={userFormToHome} 
                >
                    登録
                </Button>
        </Container>
        </div>
    );
};

export default create;