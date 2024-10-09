import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import fs from 'fs'; // 파일 시스템 모듈
import path from 'path'; // 경로 조작을 위한 모듈

const prisma = new PrismaClient(); // Prisma Client 초기화

export async function GET() {
    try {
      const galleries = await prisma.t_gallery.findMany(); // t_gallery에서 갤러리 조회
      return NextResponse.json(galleries);
    } catch (error) {
      console.error(error); // 에러 로그
      return NextResponse.json({ error: 'Failed to fetch galleries' }, { status: 500 });
    }
  }

  export async function POST(req: NextRequest) {

    try {
        const formData = await req.formData(); // FormData로 변환

        // 업데이트할 필드
        const gallery_title = formData.get('gallery_title')?.toString() || '';
        const gallery_content = formData.get('gallery_content')?.toString() || '';
        const gallery_writer = formData.get('gallery_writer')?.toString() || '';
        let gallery_image = ''; // 기본값을 빈 문자열로 설정

        // 이미지 파일이 존재하는 경우 파일 경로 설정
        const file = formData.get('gallery_image'); // 업로드된 파일 가져오기

        if (file && file instanceof File) {
            const uploadPath = path.join(process.cwd(), 'public', 'image','uploads', file.name); // 전체 경로
            // 파일 저장
            const buffer = await file.arrayBuffer(); // 파일을 버퍼로 변환
            fs.writeFileSync(uploadPath, Buffer.from(buffer)); // 파일 저장
            gallery_image = `/image/uploads/${file.name}`; // 저장할 경로
        }

        // 데이터베이스에서 gallery 신규등록
        const createGallery = await prisma.t_gallery.create({
            data: {
                gallery_title,
                gallery_content,
                gallery_image,
                gallery_writer,
            },
        });
        return NextResponse.json(createGallery); // 추가된 갤러리 정보를 반환
    } catch (error) {
        console.error(error); // 에러 로그
        return NextResponse.json({ error: 'Failed to update gallery' }, { status: 500 });
    }
}