import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import fs from 'fs'; // 파일 시스템 모듈
import path from 'path'; // 경로 조작을 위한 모듈

const prisma = new PrismaClient(); // Prisma Client 초기화

// Params 타입 정의
interface Params {
    id: string; // URL에서 추출할 id는 string 타입입니다.
}

//db에서정보얻어오는api
export async function GET(req: NextRequest, { params }: { params: Params }) {
    const { id } = params; // URL 파라미터에서 id를 추출

    try {
        const gallery = await prisma.t_gallery.findUnique({
            where: { gallery_id: Number(id) }, // id를 숫자로 변환
        });

        if (!gallery) {
            return NextResponse.json({ error: 'gallery not found' }, { status: 404 });
        }

        return NextResponse.json(gallery); // gallery 정보를 반환
    } catch (error) {
        console.error(error); // 에러 로그
        return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
    }
}

//정보수정api!!
export async function PUT(req: NextRequest, { params }: { params: Params }) {
    const { id } = params; // URL 파라미터에서 id를 추출

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

        // 데이터베이스에서 gallery 정보 수정
        const updatedGallery = await prisma.t_gallery.update({
            where: { gallery_id: Number(id) }, // id를 숫자로 변환
            data: {
                gallery_title,
                gallery_content,
                gallery_image,
                gallery_writer,
            },
        });

        return NextResponse.json(updatedGallery); // 수정된 갤러리 정보를 반환
    } catch (error) {
        console.error(error); // 에러 로그
        return NextResponse.json({ error: 'Failed to update gallery' }, { status: 500 });
    }
}

//delete-api
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params; // URL 파라미터에서 id 추출

    try {
        // 데이터베이스에서 해당 갤러리 정보를 조회
        const gallery = await prisma.t_gallery.findUnique({
            where: { gallery_id: Number(id) }
        });

        if (!gallery) {
            return NextResponse.json({ error: 'Gallery not found' }, { status: 404 });
        }

        // 이미지 파일 경로 가져오기
        const galleryImagePath = gallery.gallery_image ? path.join(process.cwd(), 'public','image','uploads', gallery.gallery_image) : null;

        // 데이터베이스에서 갤러리 정보 삭제
        await prisma.t_gallery.delete({
            where: { gallery_id: Number(id) }
        });

        // 이미지 파일 삭제 (파일 경로가 존재하고 파일이 실제로 있을 경우)
        if (galleryImagePath && fs.existsSync(galleryImagePath)) {
            fs.unlinkSync(galleryImagePath); // 파일 삭제
        }

        return NextResponse.json({ message: 'Gallery deleted successfully' });
    } catch (error) {
        console.error(error); // 에러 로그
        return NextResponse.json({ error: 'Failed to delete gallery' }, { status: 500 });
    }
}