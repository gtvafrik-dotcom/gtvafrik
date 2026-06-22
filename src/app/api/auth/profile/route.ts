import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'; // Change this to 'bcrypt' if that is the library you have installed
import prisma from '../../../../lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'gtvafrik-super-secret-jwt-key-2026';

export async function PUT(request: NextRequest) {
  try {
    // 1. Verify the user's session token
    const token = request.cookies.get('token')?.value || 
                  request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as any;
    } catch (err) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const userId = decoded.userId;

    // 2. Read the new profile data sent from the frontend
    const body = await request.json();
    const { name, email, currentPassword, newPassword } = body;

    // 3. Find the user in the database
    const user = await prisma.user.findUnique({ where: { id: userId } });
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // 4. Prepare the data payload to update
    const updateData: any = { 
      name: name?.trim(), 
      email: email?.trim() 
    };

    // 5. Securely handle password changes if the user typed a new one
    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json({ error: 'Current password is required to set a new password' }, { status: 400 });
      }

      // Verify the current password matches what is in the database
      const isValidPassword = await bcrypt.compare(currentPassword, user.password);
      if (!isValidPassword) {
        return NextResponse.json({ error: 'Incorrect current password' }, { status: 401 });
      }

      // Hash the new password before saving it
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(newPassword, salt);
    }

    // 6. Save the changes to the database
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    return NextResponse.json({ 
      success: true, 
      user: { 
        id: updatedUser.id, 
        name: updatedUser.name, 
        email: updatedUser.email 
      } 
    });

  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}