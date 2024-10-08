"use client"; 

import { useState, useEffect } from 'react';
import { useParams,useRouter  } from 'next/navigation';
import { TextField, Button, Container, Typography } from '@mui/material';

const UserUpdate = () => {
    const [user, setUser] = useState({ 
        user_name: '',
         user_email: '',
         user_address: '',
         user_phonenumber: '',
         user_nickname: '' });
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const router = useRouter();

    const fetchUser = async () => {
        try {
            const response = await fetch(`/api/users/${id}`); // API 호출
            if (!response.ok) throw new Error('Failed to fetch user');
            const data = await response.json();
            setUser({ 
                user_name: data.user_name, 
                user_email: data.user_email,
                user_address: data.user_address,
                user_phonenumber: data.user_phonenumber,
                user_nickname: data.user_nickname,
             });
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user:', error);
            setLoading(false); // 로딩 상태 종료
        }
    };

    useEffect(() => {
        if (id) {
            fetchUser();
        }
    }, [id]);
    // 입력 값 변경 핸들러
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    // 폼 제출 핸들러
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // PUT 요청으로 사용자 데이터 수정
            const response = await fetch(`/api/users/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                alert('情報が更新出来ました。！');
                router.push('/'); // 성공 페이지로 리디렉션 예시
            } else {
                alert('情報が更新出来なかったです。！');
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <Container>
            <Typography variant="h4">情報更新</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    name="user_name"
                    value={user.user_name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="user_email"
                    value={user.user_email}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="user_address"
                    value={user.user_address}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="user_phonenumber"
                    value={user.user_phonenumber}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="user_nickname"
                    value={user.user_nickname}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">
                    Update
                </Button>
            </form>
        </Container>
    );
};

export default UserUpdate;