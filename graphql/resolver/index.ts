import UserResolvers from './User';

// import { ProductResolvers } from './Product';

// Merge resolvers
export const resolvers = {
    Query: {
        ...UserResolvers.Query,
    },
    Mutation: {
        ...UserResolvers.Mutation,
    },
};