import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// POST 요청에 대해 로그아웃 처리
export async function POST(req: Request) {
  // 여기서는 특별한 로직 없이 성공 응답을 반환합니다.
  // 클라이언트에서 로컬 스토리지의 토큰을 삭제하여 세션을 종료합니다.
  
  return NextResponse.json({ message: 'Logout successful' }); // 로그아웃 성공 메시지 반환
}