import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// สมมติว่าต้องใช้ token แบบนี้
const SERVER_TOKEN = process.env.SERVER_TOKEN;

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return Response.json(
        { message: 'Missing or invalid Authorization header' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];

    if (token !== SERVER_TOKEN) {
      return Response.json(
        { message: 'Invalid token' },
        { status: 403 }
      );
    }

    const { name, email, password } = await request.json();
    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return Response.json({
      message: 'Create user success',
      data: { newUser },
    });
  } catch (error) {
    return Response.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
