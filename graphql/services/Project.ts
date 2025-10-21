import { DB } from '@/db/drizzle';
import { projects } from '@/db/schemas';
import { eq, desc } from 'drizzle-orm';
import { ProjectInput, UpdateProjectInput } from '../types';

export async function createProjectService(input: ProjectInput) {
    try {
        const [newProject] = await DB.insert(projects).values({
            ...input,
            createdAt: new Date(),
            updatedAt: new Date(),
        }).returning();

        return newProject;
    } catch (error: any) {
        throw new Error(`Failed to create project: ${error.message}`);
    }
}

export async function getProjectsService() {
    try {
        const allProjects = await DB.select()
            .from(projects)
            .orderBy(desc(projects.createdAt));

        return allProjects;
    } catch (error: any) {
        throw new Error(`Failed to fetch projects: ${error.message}`);
    }
}

export async function getProjectService(id: string) {
    try {
        const [project] = await DB.select()
            .from(projects)
            .where(eq(projects.id, id))
            .limit(1);

        return project;
    } catch (error: any) {
        throw new Error(`Failed to fetch project: ${error.message}`);
    }
}

export async function updateProjectService(id: string, input: ProjectInput) {
    try {
        const [updatedProject] = await DB.update(projects)
            .set({
                ...input,
                updatedAt: new Date(),
            })
            .where(eq(projects.id, id))
            .returning();

        return updatedProject;
    } catch (error: any) {
        throw new Error(`Failed to update project: ${error.message}`);
    }
}

export async function deleteProjectService(id: string) {
    try {
        const [deletedProject] = await DB.delete(projects)
            .where(eq(projects.id, id))
            .returning();

        return deletedProject;
    } catch (error: any) {
        throw new Error(`Failed to delete project: ${error.message}`);
    }
}

export async function getProjectBySlugService(slug: string) {
    try {
        const [project] = await DB.select()
            .from(projects)
            .where(eq(projects.slug, slug))
            .limit(1);

        return project;
    } catch (error: any) {
        throw new Error(`Failed to fetch project by slug: ${error.message}`);
    }
}
