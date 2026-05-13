import { NextResponse } from 'next/server';
import prisma from "../../../../lib/prisma";

export const dynamic = 'force-dynamic';

const FIXED_CATEGORIES = [
  "Headlines", "Breaking News", "GTV Content", "Politics", 
  "International", "Entertainment", "Health", "Sports"
];

export async function GET() {
  try {
    const dbCategories = await prisma.category.findMany({
      orderBy: { name: 'asc' }
    });

    return NextResponse.json({
      fixed: FIXED_CATEGORIES,
      custom: dbCategories.map((c: any) => c.name)
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name } = await req.json();
    if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 });

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    
    const category = await prisma.category.create({
      data: { name, slug }
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}
