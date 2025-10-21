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

export type ProjectInput = {
    name: string;
    description: string;
    aiDescription?: string;
    aiDescriptionFile?: string;
    tags: string[];
    githubLink?: string;
    demoLink?: string;
    slug: string;
    isActive?: boolean;
};

export type UpdateProjectInput = {
    id: string;
    input: ProjectInput;
};

export type Project = {
    id: string;
    name: string;
    description: string;
    aiDescription?: string;
    aiDescriptionFile?: string;
    tags: string[];
    githubLink?: string;
    demoLink?: string;
    slug: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
};