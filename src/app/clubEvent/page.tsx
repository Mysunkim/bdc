"use client"; 
import { useEffect, useState } from 'react';
import { Calendar,dateFnsLocalizer,SlotInfo } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { ja } from 'date-fns/locale'; 
import { TextField, Button, Typography, Container } from '@mui/material';
import EventRegisterModal from '@/app/component/EventRegisterModal';
const locales = {
    'ja-JP': ja,
    // 필요한 언어를 추가할 수 있습니다
};
// date-fns를 사용한 localizer 생성
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});
const clubEvent = () => {
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({
        title: '',
        start: new Date(), // 초기 시작 날짜
        end: new Date(),   // 초기 종료 날짜
        content: '',       // 이벤트 내용 초기화
        location: ''       // 이벤트 위치 초기화
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null); // 선택한 날짜 상태
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/clubEvent');
                const data = await response.json();
            
                const formattedEvents = data.map((event: any) => {
                const startDate = new Date(event.event_start_date); // ISO 형식의 날짜
                // 하루의 끝 시간 계산
                const endDate = new Date(startDate);
                endDate.setHours(23, 59, 59); // 하루의 끝
            return {
                title: event.event_title,
                start: startDate, // UTC로 변환된 시작 시간
                end: endDate, // UTC로 변환된 하루의 끝
                location: event.event_location, // 이벤트 장소 (필요하면 추가)
            };
        });
        setEvents(formattedEvents);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const eventRegist = () => {
        handleOpenModal(); // 버튼 클릭 시 모달 열기
    }

    const handleSelectSlot = (slotInfo: SlotInfo) => {
        setSelectedDate(slotInfo.start); // 선택한 날짜 상태에 저장
        handleOpenModal(); // 모달 열기
      };
    return (
        <div>
            <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            selectable
            onSelectSlot={handleSelectSlot}
            />
                            {/* 모달 컴포넌트 추가 */}
            <EventRegisterModal open={isModalOpen} onClose={handleCloseModal}  
            selectedDate={selectedDate}/>
        </div>
    );
};

export default clubEvent;