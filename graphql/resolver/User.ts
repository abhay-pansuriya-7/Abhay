import { DB } from '@/db/drizzle';
import { users } from '@/db/schemas';
import { composeMiddleware, isAuthenticated, isAdmin } from '../middleware';
import { eq } from 'drizzle-orm';
import { LoginInput, UpdateUserInput, UserInput } from '../types';
import { authenticateUser, updateUserService } from '../services/User';



const UserResolvers = {
    Query: {
        getMe: composeMiddleware(isAuthenticated)(async (_: any, args: any, context: any) => {
            try {
                const userId = context?.user?.id ?? "";
                const user = await DB.select().from(users).where(eq(users.id, userId)).limit(1);

                return {
                    status: true,
                    message: "User fetched successfully",
                    data: user.length > 0 ? user[0] : null
                };
            } catch (err: any) {
                return {
                    status: false,
                    message: err?.message ?? "Something went wrong while fetching user"
                };
            }
        }),
    },
    Mutation: {
        login: async (_: any, { input }: { input: LoginInput }) => {
            try {
                const { userName, password } = input;
                const { user, token } = await authenticateUser(userName, password);

                if (user?.id) {
                    return { status: true, message: "User authenticated successfully", data: user, token: token };
                }

                return {
                    status: false,
                    message: "Something went wrong while authenticating user"
                };
            } catch (err: any) {
                return {
                    status: false,
                    message: err?.message ?? "Something went wrong while authenticating user"
                };
            }
        },
        updateUser: composeMiddleware(isAuthenticated)(async (_: any, { id, input }: UpdateUserInput) => {
            try {
                const result = await updateUserService(id, input);

                if (result?.id) {
                    return {
                        status: true,
                        message: "User updated successfully",
                        data: result
                    };
                }

                return {
                    status: false,
                    message: "Something went wrong while updating user"
                };
            } catch (err: any) {
                return {
                    status: false,
                    message: err?.message ?? "Something went wrong while updating user"
                };
            }
        }),
        deleteUser: async (_: any, { id }: { id: string }) => {
            try {
                // Soft delete by updating a flag
                // Note: Since there's no isDeleted field in the schema, you might want to add it
                // For now, we'll just delete the user
                const deletedUser = await DB.delete(users)
                    .where(eq(users.id, id))
                    .returning();

                if (deletedUser.length > 0) {
                    return {
                        status: true,
                        message: "User deleted successfully"
                    };
                }

                return {
                    status: false,
                    message: "Something went wrong while deleting user"
                };
            } catch (err: any) {
                return {
                    status: false,
                    message: err?.message ?? "Something went wrong while deleting user"
                };
            }
        },
    },
};

export default UserResolvers;