import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';

export interface AdminUser {
  id: string;
  userName: string;
  email: string;
  isAdmin: boolean;
}

export async function getAdminUser(): Promise<AdminUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as { id: string; userName: string; email: string; isAdmin: boolean; };

    if (!decoded.isAdmin) {
      return null;
    }

    return {
      id: decoded.id,
      userName: decoded.userName,
      email: decoded.email,
      isAdmin: decoded.isAdmin,
    };
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const user = await getAdminUser();

  if (!user || !user.isAdmin) {
    redirect('/login-as-admin');
  }

  return user;
}
