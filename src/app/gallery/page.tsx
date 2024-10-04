"use client"; 
import { useEffect, useState } from 'react';
import * as React from 'react';
import CardComponent from '../CardComponent';
import { Button, Container } from '@mui/material';
import { useRouter } from 'next/navigation';

const gallery = () => {
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
    const galleryInputForm = () => {
        router.push('/gallery/InputForm'); 
    };
    const cardData = [
        {
          id: 1, // 고유한 ID 추가
          title: "Card Title 1",
          content: "This is the content of the card.",
          imageSrc: "/image/icon1.png",
          link: "/gallery/detail/1"
        },
        {
          id: 2, // 고유한 ID 추가
          title: "Card Title 2",
          content: "This is the content of the card.",
          imageSrc: "/image/icon2.png",
          link: "/gallery/detail/2"
        },
        {
            id: 3, // 고유한 ID 추가
            title: "Card Title 3",
            content: "This is the content of the card.",
            imageSrc: "/image/icon3.png",
            link: "/gallery/detail/3"
          }
      ];
    return (
    <div>
      <div>
        <Container maxWidth="xs">
          <Button 
            type="submit" 
            variant="contained" 
            color="secondary" 
            fullWidth
            onClick={galleryInputForm} 
            >
            活動登録
            </Button>
          </Container>
        </div>
        <div className="cards-container">
        {cardData.map((card) => (
          <CardComponent 
            key={card.id}
            title={card.title}
            content={card.content}
            imageSrc={card.imageSrc}
            link={card.link} // 수정된 링크 사용
          />    
        ))}
      </div>
    </div>
    );
};

export default gallery;