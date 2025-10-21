'use client';

import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client/react';
import { gql } from '@apollo/client';
import { X, Upload } from 'lucide-react';
import Button from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

const CREATE_PROJECT = gql`
  mutation CreateProject($input: ProjectInput!) {
    createProject(input: $input) {
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
      }
    }
  }
`;

const UPDATE_PROJECT = gql`
  mutation UpdateProject($input: UpdateProjectInput!) {
    updateProject(input: $input) {
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
}

interface ProjectFormProps {
  project?: Project | null;
  onClose: () => void;
  onSuccess: () => void;
}

export function ProjectForm({ project, onClose, onSuccess }: ProjectFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    aiDescription: '',
    aiDescriptionFile: '',
    tags: [] as string[],
    githubLink: '',
    demoLink: '',
    slug: '',
    isActive: true,
  });

  const [tagInput, setTagInput] = useState('');
  const [, setUploadedFile] = useState<File | null>(null);
  const [useFileUpload, setUseFileUpload] = useState(false);

  const [createProject] = useMutation(CREATE_PROJECT);
  const [updateProject] = useMutation(UPDATE_PROJECT);

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name,
        description: project.description,
        aiDescription: project.aiDescription || '',
        aiDescriptionFile: project.aiDescriptionFile || '',
        tags: project.tags,
        githubLink: project.githubLink || '',
        demoLink: project.demoLink || '',
        slug: project.slug,
        isActive: project.isActive,
      });
      setUseFileUpload(!!project.aiDescriptionFile);
    }
  }, [project]);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      ...(field === 'name' && { slug: generateSlug(value) })
    }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        alert('File size must be less than 2MB');
        return;
      }

      setUploadedFile(file);

      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();

        if (result.success) {
          setFormData(prev => ({
            ...prev,
            aiDescriptionFile: result.filePath
          }));
        } else {
          alert(result.message || 'Error uploading file');
        }
      } catch (error) {
        console.error('Upload error:', error);
        alert('Error uploading file');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const input = {
        ...formData,
        aiDescription: useFileUpload ? '' : formData.aiDescription,
        aiDescriptionFile: useFileUpload ? formData.aiDescriptionFile : '',
      };

      if (project) {
        await updateProject({
          variables: {
            input: {
              id: project.id,
              input
            }
          }
        });
      } else {
        await createProject({
          variables: { input }
        });
      }

      onSuccess();
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Error saving project. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {project ? 'Edit Project' : 'Create New Project'}
            </h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Project Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => handleInputChange('slug', e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={3}
                required
              />
            </div>

            <div>
              <Label>AI Description (for future pgvector storage)</Label>
              <div className="mt-2 space-y-4">
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={!useFileUpload}
                      onChange={() => setUseFileUpload(false)}
                      className="mr-2"
                    />
                    Text Input
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={useFileUpload}
                      onChange={() => setUseFileUpload(true)}
                      className="mr-2"
                    />
                    File Upload
                  </label>
                </div>

                {useFileUpload ? (
                  <div>
                    <div className="flex items-center gap-2">
                      <Input
                        type="file"
                        accept=".txt,.md,.pdf,.doc,.docx"
                        onChange={handleFileUpload}
                        className="flex-1"
                      />
                      <Upload className="h-4 w-4 text-gray-400" />
                    </div>
                    {formData.aiDescriptionFile && (
                      <p className="text-sm text-gray-600 mt-1">
                        Selected: {formData.aiDescriptionFile}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      Max file size: 2MB. Supported formats: TXT, MD, PDF, DOC, DOCX
                    </p>
                  </div>
                ) : (
                  <textarea
                    value={formData.aiDescription}
                    onChange={(e) => handleInputChange('aiDescription', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    rows={4}
                    placeholder="Enter AI description for future vector storage..."
                  />
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="tags">Tags</Label>
              <div className="mt-2 space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Add a tag"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  />
                  <Button type="button" onClick={handleAddTag}>
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full flex items-center gap-1"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 text-indigo-600 hover:text-indigo-800"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="githubLink">GitHub Link</Label>
                <Input
                  id="githubLink"
                  type="url"
                  value={formData.githubLink}
                  onChange={(e) => handleInputChange('githubLink', e.target.value)}
                  placeholder="https://github.com/username/repo"
                />
              </div>
              <div>
                <Label htmlFor="demoLink">Demo Link</Label>
                <Input
                  id="demoLink"
                  type="url"
                  value={formData.demoLink}
                  onChange={(e) => handleInputChange('demoLink', e.target.value)}
                  placeholder="https://your-demo-site.com"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                className="mr-2"
              />
              <Label htmlFor="isActive">Active (visible on website)</Label>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                {project ? 'Update Project' : 'Create Project'}
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}
