import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export const authMiddleware = async (request: NextRequest) => {
  const token = request.headers.get('Authorization')?.split(' ')[1];
  
  if (!token) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    (request as any).user = decoded;  // Attach user info to the request object
    return NextResponse.next();
  } catch (err) {
    console.error('JWT Verification Error:', err);
    return new NextResponse('Unauthorized', { status: 401 });
  }
};