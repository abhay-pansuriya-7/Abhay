import UserResolvers from './User';
import ProjectResolvers from './Project';

// Merge resolvers
export const resolvers = {
    Query: {
        ...UserResolvers.Query,
        ...ProjectResolvers.Query,
    },
    Mutation: {
        ...UserResolvers.Mutation,
        ...ProjectResolvers.Mutation,
    },
};