import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // .env 파일의 환경 변수를 로드

const SECRET_KEY = process.env.SECRET_KEY; 
const prisma = new PrismaClient();

// POST 요청에 대해 로그인 처리
export async function POST(req: Request) {
  const body = await req.json(); // 요청의 본문을 JSON으로 파싱
  const { member_id, password } = body; // member_id와 password를 받음
  if (!SECRET_KEY) {
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  try {
    // member_id로 사용자 조회
    const user = await prisma.t_user.findUnique({
      where: { user_memberid: member_id }, // usermember_id로 사용자 찾기
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // 비밀번호가 저장되어 있는지 확인
    if (!user.user_password) {
      return NextResponse.json({ error: 'Password not set for user' }, { status: 400 });
    }
    // 비밀번호 비교
    const passwordMatch = await bcrypt.compare(password, user.user_password);
    
    if (!passwordMatch) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    // 비밀번호가 맞으면 JWT 발급
    if (passwordMatch) {
      const token = jwt.sign({
        userId: user.user_id,           // 사용자 ID
        username: user.user_name,       // 사용자 이름
        email: user.user_email,         // 사용자 이메일
        memberId: user.user_memberid,   // 사용자 멤버 ID
      }, SECRET_KEY, { expiresIn: '1h' });
      return NextResponse.json({ token });
  } else {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to login' }, { status: 500 });
  }
}