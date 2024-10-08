"use client"; 
import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import { useRouter } from 'next/navigation';
const GalleryRegister = () => {
// gallery 항목의 타입 정의
interface Gallery {
    gallery_title: string;
    gallery_content: string;
    gallery_image: string;
    gallery_writer: string;
  }

  const [gallery, setGallery] = useState<Gallery>({
    gallery_title: '',
    gallery_content: '',
    gallery_image: '',
    gallery_writer: ''
  });

  //파일에대한 정의
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  //로케이션에대한 정의
  const router = useRouter();

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
    const formData = new FormData(); // FormData 객체 생성
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
        const response = await fetch(`/api/gallery`, {
                method: 'POST',
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
    return (
        <Container maxWidth="xs">
            <Typography variant="h4" component="h1" gutterBottom/>
                新規登録
            <form onSubmit={handleSubmit}>
                <TextField
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="gallery_title"
                    label="タイトル"
                    placeholder="タイトル"
                    value={gallery.gallery_title}
                    onChange={(e) => setGallery({
                        ...gallery,                  // 기존의 gallery 상태를 복사
                        gallery_title: e.target.value // gallery_title만 업데이트
                    })}
                    sx={{ opacity: 1 }}
                    required
                />
                <TextField
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="gallery_content"
                    label="コンテンツ"
                    placeholder="コンテンツ"
                    value={gallery.gallery_content}
                    onChange={(e) => setGallery({
                        ...gallery,                  // 기존의 gallery 상태를 복사
                        gallery_content: e.target.value // gallery_title만 업데이트
                    })}
                    sx={{ opacity: 1 }}
                    required
                />
                <TextField
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="gallery_writer"
                    label="執筆者"
                    placeholder="執筆者"
                    value={gallery.gallery_writer}
                    onChange={(e) => setGallery({
                        ...gallery,                  // 기존의 gallery 상태를 복사
                        gallery_writer: e.target.value // gallery_title만 업데이트
                    })}
                    sx={{ opacity: 1 }}
                    required
                />
                {/* 파일 업로드 필드 추가 */}
                <input
                type="file"
                accept="image/*" // 이미지 파일만 선택 가능
                onChange={handleFileChange}
                />
        
                {/* 선택한 이미지 미리보기 */}
                {imagePreview && (
                <div style={{ marginTop: '10px' }}>
                    <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '300px' }} />
                </div>
                )}
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    color="primary"
                    sx={{ marginTop: 2 }}
                />
                  内容登録
            </form>
        </Container>
    );
}

export default GalleryRegister;