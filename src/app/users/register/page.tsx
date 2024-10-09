"use client"; 
import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
const UserRegister = () => {
    const [username, setUsername] = useState('');
    const [memberid, setMemberId] = useState('');
    const [userpassword, setUserPassword] = useState('');
    const [useremail, setUserEmail] = useState('');
    const [userphone, setUserPhone] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await fetch('/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    memberid,
                    userpassword,
                    useremail,
                    userphone,
                }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const result = await response.json();
            setMessage(result.message);
        } catch (error: unknown) {
            console.error('Error registering user:', error);
            setError('会員登録に失敗しました');
        }
    };

    return (
        <Container maxWidth="xs">
            <Typography variant="h4" component="h1" gutterBottom>
                新規登録
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="username"
                    label="お名前"
                    placeholder="わかなひろゆし"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    sx={{ opacity: 1 }}
                    required
                />
                <TextField
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="memberid"
                    label="ユーザーID"
                    placeholder="わかなひろゆし"
                    value={memberid}
                    onChange={(e) => setMemberId(e.target.value)}
                    sx={{ opacity: 1 }}
                    required
                />
                <TextField
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="userpassword"
                    label="Password"
                    type="password"
                    placeholder="1234!@#ab"
                    value={userpassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                    sx={{ opacity: 0.8 }}
                    required
                />
                <TextField
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="useremail"
                    label="メール"
                    placeholder="abcde@gmail.com"
                    value={useremail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    sx={{ opacity: 1 }}
                    required
                />
                <TextField
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="userphone"
                    label="電話番号"
                    type="tel"
                    placeholder="09012340000"
                    value={userphone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    sx={{ opacity: 0.8 }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    color="primary"
                    sx={{ marginTop: 2 }}
                >
                    会員登録
                </Button>
            </form>
            {message && <p>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </Container>
    );
}

export default UserRegister;