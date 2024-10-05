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
        const user = await prisma.t_user.findUnique({
            where: { user_id: Number(id) }, // id를 숫자로 변환
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(user); // 사용자 정보를 반환
    } catch (error) {
        console.error(error); // 에러 로그
        return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
    }
}