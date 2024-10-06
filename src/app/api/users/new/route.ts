import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config(); // .env 파일의 환경 변수를 로드

const SECRET_KEY = process.env.SECRET_KEY; 
const prisma = new PrismaClient();

// POST 요청에 대해 로그인 처리
export async function POST(req: Request) {
  const body = await req.json(); // 요청의 본문을 JSON으로 파싱
  const { username, memberid,userpassword,useremail,userphone } = body; // 입력정보받음
  if (!SECRET_KEY) {
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  try {
    // 비밀번호 해싱 (bcrypt 사용)
    const hashedPassword = await bcrypt.hash(userpassword, 10);

    // 새 사용자 생성
    const newUser = await prisma.t_user.create({
      data: {
        user_name: username, // 사용자 이름
        user_memberid: memberid, // 회원 아이디
        user_password: hashedPassword, // 해싱된 비밀번호
        user_email: useremail, // 이메일
        user_phonenumber: userphone, // 전화번호
      },
    });

    return NextResponse.json({ message: 'User created successfully', user: newUser }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}