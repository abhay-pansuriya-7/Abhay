// app/api/graphql/route.ts
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { schema } from '@/graphql';
import { NextRequest } from 'next/server';
import { DB } from '@/db/drizzle';
import { users } from '@/db/schemas';
import { eq } from 'drizzle-orm';
import { cookies } from 'next/headers';
const { verify } = require('jsonwebtoken');

// JWT Secret - should be in environment variables in production
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// 🚀 Create Apollo Server instance once (singleton pattern)
const server = new ApolloServer({
    schema,
    // Production optimizations
    introspection: process.env.NODE_ENV !== 'production',
    includeStacktraceInErrorResponses: process.env.NODE_ENV !== 'production',
    // Format errors for production
    formatError: (err) => {
        // Log errors in production for monitoring
        if (process.env.NODE_ENV === 'production') {
            console.error('GraphQL Error:', err);
            // Don't expose internal errors in production
            if (err.message.includes('Internal')) {
                return new Error('Internal server error');
            }
        }
        return err;
    },
});

// Get user from token
async function getUserFromToken(token: string) {
    try {
        // Verify the token
        const decoded = verify(token, JWT_SECRET) as { userId: string };

        // Get user from database
        const user = await DB.select().from(users).where(eq(users.id, decoded.userId)).limit(1);

        return user.length > 0 ? user[0] : null;
    } catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }
}

// 🚀 Create handler once (not per request)
const handler = startServerAndCreateNextHandler(server, {
    context: async (req: NextRequest) => {
        // Get auth token from cookies or authorization header
        const cookieStore = await cookies();
        const authToken = cookieStore.get('x-token')?.value || '';

        // Get user from token if available
        const user = authToken ? await getUserFromToken(authToken) : null;

        return { db: DB, user, headers: req.headers, };
    },
});

// 🚀 Export properly typed handlers
export async function GET(request: NextRequest): Promise<Response> {
    try {
        return await handler(request);
    } catch (error) {
        console.error('GraphQL GET Error:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}

export async function POST(request: NextRequest): Promise<Response> {
    try {
        return await handler(request);
    } catch (error) {
        console.error('GraphQL POST Error:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}

// 🚀 Add OPTIONS for CORS (if needed)
export async function OPTIONS(request: NextRequest): Promise<Response> {
    return new Response(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    });
}