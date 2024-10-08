// components/EventRegisterModal.tsx
import React, { useState,useEffect } from 'react';
import { Modal, Button, Container, TextField, Typography } from '@mui/material';


interface EventRegisterModalProps {
    open: boolean;
    onClose: () => void;
    selectedDate: Date | null;
    eventToEdit?: any;
}

const EventRegisterModal: React.FC<EventRegisterModalProps> = ({ open, onClose, selectedDate }) => {
    //const [selectedDate, setSelectedDate] = useState<Date | null>(null); // 日付の状態を管理
    const [event_title, seteventTitle] = useState('');
    const [event_location, seteventLocation] = useState('');
    const [event_content, setUeventContent] = useState('');
    const [eventToEdit,setEventToEdit] = useState<any>(null);
        // 이벤트가 수정 모드일 경우 기존 데이터를 폼에 채워줌
        useEffect(() => {
            if (eventToEdit && selectedDate) {
                seteventTitle(eventToEdit.event_title);
                seteventLocation(eventToEdit.event_location);
                setUeventContent(eventToEdit.event_content);
            } else {
                // 등록 모드에서는 초기화
                seteventTitle('');
                seteventLocation('');
                setUeventContent('');
            }
        }, [eventToEdit, selectedDate]);
        // API를 통해 선택한 날짜의 이벤트 데이터를 가져오는 함수 작성
        const fetchEventByDate = async (date: Date) => {
            try {
                const response = await fetch(`/api/clubEvent?date=${date.toISOString()}`);
                const data = await response.json();
                // 선택한 날짜와 일치하는 이벤트 필터링
                const filteredEvent = data.find((event: { event_start_date: string }) => 
                    new Date(event.event_start_date).toDateString() === date.toDateString()
                );
        
                setEventToEdit(filteredEvent || null); // 필터링된 이벤트 설정
            } catch (error) {
                console.error("Failed to fetch event data:", error);
            }
        };

    // 날짜가 변경될 때마다 fetchEventByDate 호출
    useEffect(() => {
        if (selectedDate) {
            fetchEventByDate(selectedDate);
    }
    }, [selectedDate]);
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            if (eventToEdit) {
                // 수정 모드일 경우 PUT 요청
                const response = await fetch(`/api/clubEvent/clubEventUpdate/${eventToEdit.event_id}`, {
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

    const deleteHandleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
    
        try {
            if (eventToEdit) {
                // 수정 모드일 경우 삭제 요청
                const response = await fetch(`/api/clubEvent/clubEventUpdate/${eventToEdit.event_id}`, {
                    method: 'DELETE', // 삭제 요청
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
    
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
    
                alert('이벤트가 성공적으로 삭제되었습니다!');
                onClose(); // 성공 후 모달 닫기
            }
        } catch (error: any) {
            console.error('Error deleting event:', error);
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
                    <Button onClick={deleteHandleSubmit} sx={{ marginTop: 2 }} color="error">
                    이벤트 삭제
                    </Button>
                </Container>
            </div>
        </Modal>
    );
};

export default EventRegisterModal;