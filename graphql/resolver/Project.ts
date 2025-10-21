import { DB } from '@/db/drizzle';
import { projects } from '@/db/schemas';
import { composeMiddleware, isAdmin } from '../middleware';
import { ProjectInput, UpdateProjectInput } from '../types';
import { 
    createProjectService, 
    getProjectsService, 
    getProjectService, 
    updateProjectService, 
    deleteProjectService 
} from '../services/Project';

const ProjectResolvers = {
    Query: {
        getProjects: composeMiddleware(isAdmin)(async (_: any, args: any, context: any) => {
            try {
                const projects = await getProjectsService();

                return {
                    status: true,
                    message: "Projects fetched successfully",
                    data: projects
                };
            } catch (err: any) {
                return {
                    status: false,
                    message: err?.message ?? "Something went wrong while fetching projects"
                };
            }
        }),

        getProject: composeMiddleware(isAdmin)(async (_: any, { id }: { id: string }, context: any) => {
            try {
                const project = await getProjectService(id);

                if (!project) {
                    return {
                        status: false,
                        message: "Project not found"
                    };
                }

                return {
                    status: true,
                    message: "Project fetched successfully",
                    data: project
                };
            } catch (err: any) {
                return {
                    status: false,
                    message: err?.message ?? "Something went wrong while fetching project"
                };
            }
        }),
    },

    Mutation: {
        createProject: composeMiddleware(isAdmin)(async (_: any, { input }: { input: ProjectInput }, context: any) => {
            try {
                const project = await createProjectService(input);

                return {
                    status: true,
                    message: "Project created successfully",
                    data: project
                };
            } catch (err: any) {
                return {
                    status: false,
                    message: err?.message ?? "Something went wrong while creating project"
                };
            }
        }),

        updateProject: composeMiddleware(isAdmin)(async (_: any, { input }: { input: UpdateProjectInput }, context: any) => {
            try {
                const { id, input: projectInput } = input;
                const project = await updateProjectService(id, projectInput);

                if (!project) {
                    return {
                        status: false,
                        message: "Project not found"
                    };
                }

                return {
                    status: true,
                    message: "Project updated successfully",
                    data: project
                };
            } catch (err: any) {
                return {
                    status: false,
                    message: err?.message ?? "Something went wrong while updating project"
                };
            }
        }),

        deleteProject: composeMiddleware(isAdmin)(async (_: any, { id }: { id: string }, context: any) => {
            try {
                const project = await deleteProjectService(id);

                if (!project) {
                    return {
                        status: false,
                        message: "Project not found"
                    };
                }

                return {
                    status: true,
                    message: "Project deleted successfully"
                };
            } catch (err: any) {
                return {
                    status: false,
                    message: err?.message ?? "Something went wrong while deleting project"
                };
            }
        }),
    },
};

export default ProjectResolvers;
