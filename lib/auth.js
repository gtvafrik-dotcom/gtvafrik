import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export function getTokenFromRequest(request) {
  const token = request.cookies.get('token')?.value || 
                request.headers.get('authorization')?.replace('Bearer ', '');
  return token;
}

export async function requireAuth(request) {
  const token = getTokenFromRequest(request);
  
  if (!token) {
    return { error: 'No token provided', status: 401 };
  }

  const decoded = verifyToken(token);
  
  if (!decoded) {
    return { error: 'Invalid token', status: 401 };
  }

  return { user: decoded };
}

export function createAuthMiddleware(requiredRole = null) {
  return async function middleware(request) {
    const auth = await requireAuth(request);
    
    if (auth.error) {
      return Response.json(
        { error: auth.error },
        { status: auth.status }
      );
    }

    if (requiredRole && auth.user.role !== requiredRole) {
      return Response.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      );
    }

    request.user = auth.user;
    return null; // Continue to the actual handler
  };
}
