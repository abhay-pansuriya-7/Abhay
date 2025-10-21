import { gql } from 'graphql-tag';

export const ProjectSchema = gql`
  type Project {
    id: ID!
    name: String!
    description: String!
    aiDescription: String
    aiDescriptionFile: String
    tags: [String!]!
    githubLink: String
    demoLink: String
    slug: String!
    isActive: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  input ProjectInput {
    name: String!
    description: String!
    aiDescription: String
    aiDescriptionFile: String
    tags: [String!]!
    githubLink: String
    demoLink: String
    slug: String!
    isActive: Boolean
  }

  input UpdateProjectInput {
    id: ID!
    input: ProjectInput!
  }

  type ProjectResponse {
    status: Boolean!
    message: String!
    data: Project
  }

  type ProjectsResponse {
    status: Boolean!
    message: String!
    data: [Project!]
  }

  extend type Query {
    getProjects: ProjectsResponse!
    getProject(id: ID!): ProjectResponse!
  }

  extend type Mutation {
    createProject(input: ProjectInput!): ProjectResponse!
    updateProject(input: UpdateProjectInput!): ProjectResponse!
    deleteProject(id: ID!): ProjectResponse!
  }
`;
