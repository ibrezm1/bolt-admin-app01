import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { User } from '@/lib/types';

export async function GET() {
  try {
    const usersFile = await fs.readFile(path.join(process.cwd(), 'data/users.json'), 'utf-8');
    const { users } = JSON.parse(usersFile);
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    const usersFile = await fs.readFile(path.join(process.cwd(), 'data/users.json'), 'utf-8');
    const data = JSON.parse(usersFile);

    const newUser: User = {
      id: Date.now().toString(),
      username,
      password,
      role: 'admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    data.users.push(newUser);
    await fs.writeFile(
      path.join(process.cwd(), 'data/users.json'),
      JSON.stringify(data, null, 2)
    );

    return NextResponse.json({ user: newUser });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}