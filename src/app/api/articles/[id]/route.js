import { NextResponse } from 'next/server';
import { query } from '../../../../../lib/db.js';
import { createAuthMiddleware } from '../../../../../lib/auth.js';

const authMiddleware = createAuthMiddleware('admin');

export async function GET(request, { params }) {
  const authResult = await authMiddleware(request);
  if (authResult) return authResult;

  try {
    const { id } = params;
    
    const result = await query(`
      SELECT a.*, u.name as author_name 
      FROM articles a 
      LEFT JOIN users u ON a.author_id = u.id 
      WHERE a.id = $1
    `, [id]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      article: result.rows[0]
    });
  } catch (error) {
    console.error('Error fetching article:', error);
    return NextResponse.json(
      { error: 'Failed to fetch article' },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  const authResult = await authMiddleware(request);
  if (authResult) return authResult;

  try {
    const { id } = params;
    const { title, content, excerpt, status } = await request.json();

    // Build the dynamic query
    const updates = [];
    const values = [];
    let paramIndex = 1;

    if (title !== undefined) {
      updates.push(`title = $${paramIndex++}`);
      values.push(title);
      
      // Update slug if title changed
      const slug = title.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      updates.push(`slug = $${paramIndex++}`);
      values.push(slug);
    }

    if (content !== undefined) {
      updates.push(`content = $${paramIndex++}`);
      values.push(content);
    }

    if (excerpt !== undefined) {
      updates.push(`excerpt = $${paramIndex++}`);
      values.push(excerpt);
    }

    if (status !== undefined) {
      updates.push(`status = $${paramIndex++}`);
      values.push(status);
      
      // Set published_at when publishing
      if (status === 'published') {
        updates.push(`published_at = CURRENT_TIMESTAMP`);
      }
    }

    updates.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);

    const result = await query(`
      UPDATE articles 
      SET ${updates.join(', ')}
      WHERE id = $${paramIndex}
      RETURNING *
    `, values);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      article: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating article:', error);
    return NextResponse.json(
      { error: 'Failed to update article' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const authResult = await authMiddleware(request);
  if (authResult) return authResult;

  try {
    const { id } = params;

    const result = await query('DELETE FROM articles WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Article deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting article:', error);
    return NextResponse.json(
      { error: 'Failed to delete article' },
      { status: 500 }
    );
  }
}
