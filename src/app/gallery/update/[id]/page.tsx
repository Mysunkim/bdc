"use client"; 

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { TextField, Button, Container, Typography } from '@mui/material';

// gallery 항목의 타입 정의
interface Gallery {
  gallery_title: string;
  gallery_content: string;
  gallery_image: string;
  gallery_writer: string;
}

const GalleryUpdate = () => {
  const [gallery, setGallery] = useState<Gallery>({
    gallery_title: '',
    gallery_content: '',
    gallery_image: '',
    gallery_writer: ''
  });
  
  const { id } = useParams();
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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

  // 입력 값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setGallery({ ...gallery, [e.target.name]: e.target.value });
  };

  // 파일 선택 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    
    // 선택한 파일의 미리보기 생성
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
      }
    };
    
  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
      // FormData 객체 생성
      const formData = new FormData();

      // gallery 데이터 추가
      formData.append('gallery_title', gallery.gallery_title);
      formData.append('gallery_content', gallery.gallery_content);
      formData.append('gallery_writer', gallery.gallery_writer);

      // 이미지 파일이 선택된 경우 추가
      if (selectedFile) {
        formData.append('gallery_image', selectedFile);
      }
        
      e.preventDefault();
          try {
                // PUT 요청으로 사용자 데이터 수정
                const response = await fetch(`/api/gallery/${id}`, {
                    method: 'PUT',
                    body: formData,
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

  //삭제기능!
  const deleteHandleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            if (!id) {
              alert('갤러리 ID가 유효하지 않습니다.');
              return;
            }
        
            const response = await fetch(`/api/gallery/${id}`, {
              method: 'DELETE', // 삭제 요청
              headers: {
                'Content-Type': 'application/json',
              },
            });
        
            if (!response.ok) {
              throw new Error(`Error: ${response.statusText}`);
            }
        
            alert('갤러리가 성공적으로 삭제되었습니다!');
            // 삭제 후 리다이렉션 또는 다른 작업 처리
            // 예시: router.push('/gallery-list'); 
          } catch (error: unknown) {
            console.error('Error deleting gallery:', error);
            alert('갤러리 삭제 중 오류가 발생했습니다.');
          }
        };
    return (
          <Container>
            <Typography variant="h4">情報更新</Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                    name="gallery_title"
                    value={gallery.gallery_title}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="gallery_content"
                    value={gallery.gallery_content}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="gallery_writer" // 공백 제거
                    value={gallery.gallery_writer}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                {/* 파일 업로드 필드 추가 */}
                <input
                type="file"
                accept="image/*" // 이미지 파일만 선택 가능
                onChange={handleFileChange}
                />
        
                {/* 선택한 이미지 미리보기 */}
                {imagePreview && (
                <div style={{ display:'flex' }}>
                  <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '300px' }} />
                </div>
                )}
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-start', gap: '10px' }}>
                  <Button type="submit" variant="contained" color="primary"/>
                    Update
                  <Button onClick={deleteHandleSubmit} variant="contained" color="primary"/>
                    Delete
                </div>
              </form>
        </Container>
    );
};

export default GalleryUpdate;