'use client';

import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import { gql } from '@apollo/client';
import { Plus, Edit, Trash2, Eye, EyeOff, ExternalLink, Github } from 'lucide-react';
import Button from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ProjectForm } from './project-form';

const GET_PROJECTS = gql`
  query GetProjects {
    getProjects {
      status
      message
      data {
        id
        name
        description
        aiDescription
        aiDescriptionFile
        tags
        githubLink
        demoLink
        slug
        isActive
        createdAt
        updatedAt
      }
    }
  }
`;

const DELETE_PROJECT = gql`
  mutation DeleteProject($id: ID!) {
    deleteProject(id: $id) {
      status
      message
    }
  }
`;

const UPDATE_PROJECT_STATUS = gql`
  mutation UpdateProject($input: UpdateProjectInput!) {
    updateProject(input: $input) {
      status
      message
      data {
        id
        isActive
      }
    }
  }
`;

interface Project {
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
  createdAt: string;
  updatedAt: string;
}

interface GetProjectsResponse {
  getProjects: {
    status: boolean;
    message: string;
    data: Project[];
  };
}


export function ProjectsManagement() {
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const { data, loading, error, refetch } = useQuery<GetProjectsResponse>(GET_PROJECTS);
  const [deleteProject] = useMutation(DELETE_PROJECT);
  const [updateProjectStatus] = useMutation(UPDATE_PROJECT_STATUS);

  const projects = data?.getProjects?.data || [];

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject({ variables: { id } });
        refetch();
      } catch (error: unknown) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const handleToggleStatus = async (project: Project) => {
    try {
      await updateProjectStatus({
        variables: {
          input: {
            id: project.id,
            input: {
              ...project,
              isActive: !project.isActive,
            }
          }
        }
      });
      refetch();
    } catch (error) {
      console.error('Error updating project status:', error);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingProject(null);
  };

  const handleFormSuccess = () => {
    refetch();
    handleFormClose();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Projects Management</h2>
        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Project
        </Button>
      </div>

      {showForm && (
        <ProjectForm
          project={editingProject}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project: Project) => (
          <Card key={project.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => handleToggleStatus(project)}
                  className={`p-1 rounded ${project.isActive
                      ? 'text-green-600 hover:bg-green-50'
                      : 'text-gray-400 hover:bg-gray-50'
                    }`}
                >
                  {project.isActive ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => handleEdit(project)}
                  className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{project.description}</p>

            <div className="flex flex-wrap gap-1 mb-4">
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex gap-2 text-sm text-gray-500">
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-gray-700"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              )}
              {project.demoLink && (
                <a
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-gray-700"
                >
                  <ExternalLink className="h-4 w-4" />
                  Demo
                </a>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Created: {new Date(project.createdAt).toLocaleDateString()}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No projects found. Create your first project!</p>
        </div>
      )}
    </div>
  );
}
