"use client"; 
import { useEffect, useState } from 'react';
import { Calendar,dateFnsLocalizer,SlotInfo } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { ja } from 'date-fns/locale'; 
import EventRegisterModal from '@/app/component/EventRegisterModal';
// Event 인터페이스 정의
interface Event {
    event_title: string;
    event_start_date: string; // ISO 형식의 날짜
    event_location?: string; // 선택적인 속성
}

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
    const [events, setEvents] = useState<{ title: string; start: Date; end: Date; location?: string }[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null); // 선택한 날짜 상태
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/clubEvent');
                const data: Event[] = await response.json();
            
                const formattedEvents = data.map((event: Event) => {
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