// components/EventRegisterModal.tsx
import React, { useState,useEffect } from 'react';
import { Modal, Button, Container, TextField, Typography } from '@mui/material';


interface EventRegisterModalProps {
    open: boolean;
    onClose: () => void;
    selectedDate: Date | null;
    eventToEdit?: any;
}

const EventRegisterModal: React.FC<EventRegisterModalProps> = ({ open, onClose, selectedDate,eventToEdit }) => {
    //const [selectedDate, setSelectedDate] = useState<Date | null>(null); // 日付の状態を管理

    const [event_title, seteventTitle] = useState('');
    const [event_location, seteventLocation] = useState('');
    const [event_content, setUeventContent] = useState('');

        // 이벤트가 수정 모드일 경우 기존 데이터를 폼에 채워줌
        useEffect(() => {
            if (eventToEdit) {
                seteventTitle(eventToEdit.event_title);
                seteventLocation(eventToEdit.event_location);
                setUeventContent(eventToEdit.event_content);
            } else {
                // 등록 모드에서는 초기화
                seteventTitle('');
                seteventLocation('');
                setUeventContent('');
            }
        }, [eventToEdit]);
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            if (eventToEdit) {
                // 수정 모드일 경우 PUT 요청
                const response = await fetch(`/api/clubEvent/${eventToEdit.id}`, {
                    method: 'PUT', // 수정 요청
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        event_title,
                        event_location,
                        event_content,
                        event_start: selectedDate || eventToEdit.start, // 수정 시 선택한 날짜 또는 기존 시작 날짜
                    }),
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                alert('이벤트가 성공적으로 수정되었습니다!');
            } else {
                // 등록 모드일 경우 POST 요청
                const response = await fetch('/api/clubEvent/clubEventRegister', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        event_title,
                        event_location,
                        event_content,
                        event_start: selectedDate,
                    }),
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                alert('이벤트가 성공적으로 등록되었습니다!');
            }

            onClose(); // 성공 후 모달 닫기
        } catch (error: any) {
            console.error('Error registering event:', error);

        }
    };
    return (
        <Modal open={open} onClose={onClose}>
            <div style={{ padding: '20px', background: 'white', margin: '100px auto', maxWidth: '400px' }}>
                <Container maxWidth="xs">
                    <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'black' }}>
                    {eventToEdit ? 'イベント登録' : 'イベント修正'}
                    </Typography>
                    <form onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="event_title"
                        label="イベントタイトル"
                        placeholder="わかなひろゆし"
                        sx={{ opacity: 1 }}
                        value={event_title}
                        onChange={(e) => seteventTitle(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="event_location"
                        label="場所"
                        placeholder="東体育館"
                        sx={{ opacity: 1 }}
                        value={event_location}
                        onChange={(e) => seteventLocation(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="event_content"
                        label="内容"
                        placeholder="ゲーム"
                        sx={{ opacity: 1 }}
                        value={event_content}
                        onChange={(e) => setUeventContent(e.target.value)}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        color="primary"
                        sx={{ marginTop: 2 }}
                    >
                        {eventToEdit ? 'イベント修正' : 'イベント登録'}
                    </Button>
                    </form>
                    <Button onClick={onClose} sx={{ marginTop: 2 }}>
                        閉じる
                    </Button>
                </Container>
            </div>
        </Modal>
    );
};

export default EventRegisterModal;