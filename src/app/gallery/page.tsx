"use client"; 
import { useEffect, useState } from 'react';
import * as React from 'react';
import CardComponent from '@/app/component/CardComponent';
import { Button, Container } from '@mui/material';
import { useRouter } from 'next/navigation';
// gallery 항목의 타입 정의
interface GalleryItem {
  gallery_id: number;
  gallery_title: string;
  gallery_image: string;
  gallery_writer: string;
}

const Gallery = () => {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/gallery');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setGallery(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    const galleryRegisterForm = () => {
        router.push('/gallery/register'); 
    };
    return (
      <div>
        <Container maxWidth="xs">
          <div className="cards-container">
            {gallery.map((card) => (
              <CardComponent 
                key={card.gallery_id}
                title={card.gallery_title}
                link={`/gallery/detail/${card.gallery_id}`} // 상세 페이지 링크로 수정
                writer={card.gallery_writer}
              />    
            ))}
          </div>
          {/* 이 div가 잘못된 위치에 있었습니다 */}
          <div style={{ position: 'relative', height: '100vh' }}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              onClick={galleryRegisterForm}
              style={{
                position: 'absolute',
                bottom: '20px', // 화면 아래쪽에서 20px 위로
                left: '50%',    // 가로 중앙 정렬
                transform: 'translateX(-50%)' // 정렬 보정
              }}
            >
              活動登録
            </Button>
          </div>
        </Container>
      </div>
    );
};

export default Gallery;