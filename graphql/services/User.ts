import * as bcrypt from 'bcrypt';
const { sign } = require('jsonwebtoken');
import { eq, or } from 'drizzle-orm';
import { DB } from '@/db/drizzle';
import { users } from '@/db/schemas';
import { UserInput } from '../types';

// JWT Secret - should be in environment variables in production
const JWT_SECRET = process.env.JWT_SECRET;
// Authentication service
export const authenticateUser = async (userName: string, password: string) => {
    const user = await DB.select().from(users).where(or(eq(users.userName, userName), eq(users.email, userName))).limit(1);

    if (user.length === 0) {
        throw new Error("User not found");
    }
    const userObj = user[0];
    const isPasswordValid = await bcrypt.compare(password, userObj.password);

    if (!isPasswordValid) {
        throw new Error("Invalid credentials");
    }

    // Generate JWT token
    const token = sign({ userId: userObj.id }, JWT_SECRET, { expiresIn: '7d' });
    return { user: userObj, token };
};

// Update user service
export const updateUserService = async (id: string, input: UserInput) => {
    const updatedUser = await DB.update(users)
        .set({
            ...input,
            updatedAt: new Date()
        })
        .where(eq(users.id, id))
        .returning();

    return updatedUser[0];
};
