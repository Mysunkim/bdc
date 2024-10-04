import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient(); // Prisma Client 초기화

export async function GET(req: NextRequest) {
  try {
    const events  = await prisma.t_event.findMany(); // DB에서 이벤트 조회
    return NextResponse.json(events );
  } catch (error) {
    console.error(error); // 에러 로그
    return NextResponse.json({ error: 'Failed to fetch events ' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { event_title, event_content,event_location } = body; // 이벤트 속성 이름에 맞게 수정

  try {
    const newEvent = await prisma.user.create({
      data: { event_title, event_content,event_location },
    });
    return NextResponse.json(newEvent);
  } catch (error) {
    console.error(error); // 에러 로그
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}