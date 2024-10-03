"use client"; 
import { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
const clubEvent = () => {
    const [data, setData] = useState<string | null>(null);
    const localizer = momentLocalizer(moment);
    const events = [
        {
          title: '南部体育館',
          start: new Date(),
          end: new Date(),
        },
        {
            title: '中央体育館',
            start: new Date(),
            end: new Date(),
          },
          {
            title: '東体育館',
            start: new Date('2024-10-04'), // 하루짜리 이벤트
            end: new Date('2024-10-04T23:59:59'), // 하루의 마지막 순간
          },
          {
            title: '北原体育館',
            start: new Date('2024-10-01'), // 하루짜리 이벤트
            end: new Date('2024-10-01T23:59:59'), // 하루의 마지막 순간
          },
      ];
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

    return (
        <div>
            <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            />
        </div>
    );
};

export default clubEvent;