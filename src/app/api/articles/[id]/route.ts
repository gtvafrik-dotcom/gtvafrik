import { NextResponse } from 'next/server';
import prisma from "../../../../../lib/prisma";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const article = await prisma.article.findUnique({
      where: { id: parseInt(id) },
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

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await request.json();
    const { title, content, excerpt, thumbnail, status, categories } = data;

    const updateData: any = {};
    if (title !== undefined) {
      updateData.title = title;
      updateData.slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    if (content !== undefined) updateData.content = content;
    if (excerpt !== undefined) updateData.excerpt = excerpt;
    if (thumbnail !== undefined) updateData.thumbnail = thumbnail;
    if (status !== undefined) {
      updateData.status = status;
      if (status === 'published') updateData.publishedAt = new Date();
    }

    // Handle categories update
    if (categories && Array.isArray(categories)) {
      // First, get the IDs of the categories or create them if they don't exist
      const categoryConnections = await Promise.all(
        categories.map(async (catName: string) => {
          const category = await prisma.category.upsert({
            where: { name: catName },
            update: {},
            create: { name: catName }
          });
          return { categoryId: category.id };
        })
      );

      // Delete existing article-category relations
      await prisma.articleCategory.deleteMany({
        where: { articleId: parseInt(id) }
      });

      // Create new ones
      if (categoryConnections.length > 0) {
        updateData.categories = {
          create: categoryConnections
        };
      }
    }

    const article = await prisma.article.update({
      where: { id: parseInt(id) },
      data: updateData
    });

    return NextResponse.json({ article });
  } catch (error) {
    console.error('Error updating article:', error);
    return NextResponse.json({ error: 'Failed to update article' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    await prisma.article.delete({ where: { id: parseInt(id) } });

    return NextResponse.json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Error deleting article:', error);
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 });
  }
}
