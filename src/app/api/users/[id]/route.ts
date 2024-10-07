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

export async function PUT(req: NextRequest, { params }: { params: Params }) {
    const { id } = params; // URL 파라미터에서 id를 추출

    try {
        const body = await req.json(); // 요청 본문에서 JSON 데이터 가져오기

        // 업데이트할 필드
        const { user_name, user_email, user_address, user_phonenumber, user_nickname } = body;

        // 데이터베이스에서 사용자 정보 수정
        const updatedUser = await prisma.t_user.update({
            where: { user_id: Number(id) }, // id를 숫자로 변환
            data: {
                user_name,
                user_email,
                user_address,
                user_phonenumber,
                user_nickname,
            },
        });

        return NextResponse.json(updatedUser); // 수정된 사용자 정보를 반환
    } catch (error) {
        console.error(error); // 에러 로그
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    }
}