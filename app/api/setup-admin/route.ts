import { NextResponse } from 'next/server';
import { addUser, findUserByEmail, getUsers, saveUsers } from '@/lib/data';

export async function POST(request: Request) {
  try {
    const { email, name, password, studentId, phone } = await request.json();
    
    let user = findUserByEmail(email);
    
    if (user) {
      // Update existing user to admin
      const users = getUsers();
      const index = users.findIndex((u: any) => u.email === email);
      users[index].role = 'admin';
      saveUsers(users);
      return NextResponse.json({ message: 'User updated to admin', user: users[index] });
    } else {
      // Create new admin user
      const newUser = addUser({
        email,
        name,
        password,
        studentId,
        phone,
        role: 'admin'
      });
      return NextResponse.json({ message: 'Admin created', user: newUser });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}