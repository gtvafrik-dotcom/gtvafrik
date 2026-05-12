import { NextResponse } from 'next/server';
import prisma from "../../../../../lib/prisma";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit')) || 10;
    const offset = parseInt(searchParams.get('offset')) || 0;

    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where: { status: 'published' },
        orderBy: { publishedAt: 'desc' },
        take: limit,
        skip: offset,
        include: { author: true, categories: { include: { category: true } } }
      }),
      prisma.article.count({ where: { status: 'published' } })
    ]);

    return NextResponse.json({ articles, total, limit, offset });
  } catch (error) {
    console.error('Error fetching public articles:', error);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}
