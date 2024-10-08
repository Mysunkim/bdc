import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient(); // Prisma Client 초기화

// Params 타입 정의
interface Params {
    id: string; // URL에서 추출할 id는 string 타입입니다.
}

export async function GET(req: NextRequest, { params }: { params: Params }) {
    const { id } = params; // URL 파라미터에서 id를 추출

    try {
        const event = await prisma.t_event.findUnique({
            where: { event_id: Number(id) }, // event_id를 숫자로 변환
        });

        if (!event) {
            return NextResponse.json({ error: 'Event not found' }, { status: 404 });
        }

        return NextResponse.json(event); // 이벤트 정보를 반환
    } catch (error) {
        console.error(error); // 에러 로그
        return NextResponse.json({ error: 'Failed to fetch event' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: Params }) {
    const { id } = params; // URL 파라미터에서 id를 추출

    try {
        const body = await req.json(); // 요청 본문에서 JSON 데이터 가져오기

        // 업데이트할 필드
        const { event_title, event_location, event_content, event_start_date } = body;

        // 데이터베이스에서 이벤트 정보 수정
        const updatedEvent = await prisma.t_event.update({
            where: { event_id: Number(id) }, // id를 숫자로 변환
            data: {
                event_title,
                event_location,
                event_content,
                event_start_date, // 이벤트 시작 날짜
                // 필요한 경우 추가 필드도 포함
            },
        });

        return NextResponse.json(updatedEvent); // 수정된 이벤트 정보를 반환
    } catch (error) {
        console.error(error); // 에러 로그
        return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
    }
}