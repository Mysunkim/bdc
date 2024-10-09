"use client"; 

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button, Typography } from '@mui/material';
// gallery 항목의 타입 정의
interface Gallery {
  gallery_title: string;
  gallery_content: string;
  gallery_image: string;
  gallery_writer: string;
}

const GalleryDetail = () => {
  const [gallery, setGallery] = useState<Gallery>({
    gallery_title: '',
    gallery_content: '',
    gallery_image: '',
    gallery_writer: ''
  });

  const { id } = useParams();
  const router = useRouter();

  const fetchGallery = async () => {
        try {
            const response = await fetch(`/api/gallery/${id}`);
            if (!response.ok) throw new Error('Failed to fetch gallery');
            const data = await response.json();
            setGallery(data);
        } catch (error) {
            console.error('Error fetching gallery:', error);
        }
    };

  useEffect(() => {
    fetchGallery();
  }, [id]);

  if (!gallery) {
    return <div>Loading...</div>;
  }

    return (
        <div>
            <Typography variant="h1"/>{gallery.gallery_title}
            <Typography variant="body1" className="subtext"/> {gallery.gallery_content}
              <img src={gallery.gallery_image} alt={gallery.gallery_title} />
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-start', gap: '10px' }} >
              <Button variant="contained" color="primary" onClick={() => router.push(`/gallery/update/${id}`)}>
                修正
              </Button>
            </div>
        </div>
    );
};

export default GalleryDetail;