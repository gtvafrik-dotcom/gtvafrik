import { NextResponse } from 'next/server';
import prisma from "../../../../lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const limit = searchParams.get('limit');

    const query: any = {
      orderBy: { createdAt: 'desc' },
      include: {
        categories: { include: { category: true } }
      }
    };

    if (status) query.where = { status };
    if (limit) query.take = parseInt(limit, 10);

    const articles = await prisma.article.findMany(query);
    return NextResponse.json({ articles });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { title, content, excerpt, thumbnail, categories, status } = data;

    if (!title) return NextResponse.json({ error: 'Title is required' }, { status: 400 });

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now();

    // Ensure categories exist and connect them
    const categoryConnects = [];
    if (categories && categories.length > 0) {
      for (const catName of categories) {
        let category = await prisma.category.findUnique({ where: { name: catName } });
        if (!category) {
          const catSlug = catName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
          category = await prisma.category.create({ data: { name: catName, slug: catSlug } });
        }
        categoryConnects.push({
          category: { connect: { id: category.id } }
        });
      }
    }

    const article = await prisma.article.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        thumbnail,
        status: status || 'draft',
        publishedAt: status === 'published' ? new Date() : null,
        categories: {
          create: categoryConnects
        }
      }
    });

    return NextResponse.json(article);
  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
  }
}
