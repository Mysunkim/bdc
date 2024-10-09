import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const events = await prisma.t_event.findMany({
        });
        return NextResponse.json(events); // 변환된 데이터를 반환
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const body = await req.json(); // 요청의 본문을 JSON으로 파싱
    const { event_title, event_start, event_content, event_location } = body;  // 입력정보받음

  
    try {
        // 새 이벤트 생성
        const newEvent = await prisma.t_event.create({
            data: {
                event_title: event_title,
                event_start_date: event_start, // event_start를 event_start_date로 매핑
                event_content: event_content, // 필수 필드 추가
                event_location: event_location, // 필요 시 추가
                // event_create_date 및 event_edit_date는 자동으로 설정됨
            },
        });
  
      return NextResponse.json({ message: 'event created successfully', event: newEvent }, { status: 201 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
    }
  }