export type LoginInput = {
    userName: string;
    password: string;
}

export type AuthResponse = {
    user: any;
    token: string;
}

export type UserInput = {
    firstName?: string;
    lastName?: string;
    email?: string;
    profilePicture?: string;
    phoneNo?: string;
};

export type UpdateUserInput = {
    id: string;
    input: UserInput;
};