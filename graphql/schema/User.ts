const UserSchema = `
   type User {
    id: String
    firstName: String
    lastName: String
    email: String    
    profilePicture: String
    phoneNo: String    
  }

  type UserResponse {
    status: Boolean!
    message: String!
    data: User
    token: String
  }

  type CommonResponse {
    status: Boolean!
    message: String!    
  }

  input UserInput {
    firstName: String
    lastName: String
    email: String
    profilePicture: String
    phoneNo: String
  }

  input LoginInput {
    userName: String!
    password: String!
  }

  type Query {    
    getMe: UserResponse
  }

  type Mutation {    
    login(input: LoginInput): UserResponse
    updateUser(id: String!, input: UserInput): UserResponse
    deleteUser(id: String!): CommonResponse
  }
`;

export default UserSchema;