import { NextResponse } from 'next/server';
import prisma from "../../../../../../lib/prisma";

export async function GET(request, { params }) {
  try {
    const { slug } = await params;

    const article = await prisma.article.findFirst({
      where: { slug, status: 'published' },
      include: { author: true, categories: { include: { category: true } } }
    });

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json({ article });
  } catch (error) {
    console.error('Error fetching article:', error);
    return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 });
  }
}
