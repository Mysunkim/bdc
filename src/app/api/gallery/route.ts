import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient(); // Prisma Client 초기화

export async function GET(req: NextRequest) {
    try {
      const galleries = await prisma.t_gallery.findMany(); // t_gallery에서 갤러리 조회
      return NextResponse.json(galleries);
    } catch (error) {
      console.error(error); // 에러 로그
      return NextResponse.json({ error: 'Failed to fetch galleries' }, { status: 500 });
    }
  }

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { gallery_title, gallery_content, gallery_image, gallery_writer } = body; // 갤러리 속성 이름에 맞게 수정
  
    try {
      const newGallery = await prisma.t_gallery.create({
        data: { gallery_title, gallery_content, gallery_image, gallery_writer },
      });
      return NextResponse.json(newGallery);
    } catch (error) {
      console.error(error); // 에러 로그
      return NextResponse.json({ error: 'Failed to create gallery' }, { status: 500 });
    }
  }