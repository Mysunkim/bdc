import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient(); // Prisma Client 초기화

export async function GET(req: NextRequest) {
  try {
    const users = await prisma.t_user.findMany(); // DB에서 사용자 조회
    return NextResponse.json(users);
  } catch (error) {
    console.error(error); // 에러 로그
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

