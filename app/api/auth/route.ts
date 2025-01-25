import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { LoginCredentials } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const body: LoginCredentials = await request.json();
    const { username, password } = body;

    const usersFile = await fs.readFile(path.join(process.cwd(), 'data/users.json'), 'utf-8');
    const { users } = JSON.parse(usersFile);

    const user = users.find(
      (u: any) => u.username === username && u.password === password
    );

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}