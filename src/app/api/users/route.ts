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

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email } = body;

  try {
    const newUser = await prisma.user.create({
      data: { name, email },
    });
    return NextResponse.json(newUser);
  } catch (error) {
    console.error(error); // 에러 로그
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}