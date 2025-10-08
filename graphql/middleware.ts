export function composeMiddleware(...middlewares: Function[]) {
    return (resolver: Function) =>
        middlewares.reduceRight((acc, middleware) => middleware(acc), resolver);
}

export function isAuthenticated<TArgs = any, TResult = any>(
    next: (parent: any, args: TArgs, context: any, info: any) => Promise<TResult>
) {
    return async (parent: any, args: TArgs, context: any, info: any): Promise<TResult> => {
        if (!context?.user) {
            throw new Error("Not authenticated");
        }
        return next(parent, args, context, info);
    };
}

export function isAdmin<TArgs = any, TResult = any>(
    next: (parent: any, args: TArgs, context: any, info: any) => Promise<TResult>
) {
    return async (parent: any, args: TArgs, context: any, info: any): Promise<TResult> => {
        const user = context?.user;

        if (!user) {
            throw new Error("You must be signed in.");
        }

        // You can add an isAdmin field to your user schema if needed
        if (!user.isAdmin) {
            throw new Error("You must be an admin to access this resource.");
        }

        return next(parent, args, context, info);
    };
}
