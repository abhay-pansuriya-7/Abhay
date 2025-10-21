import { requireAdmin } from '@/lib/admin-auth';
import { ProjectsManagement } from '@/components/admin/projects-management';

export default async function AdminPage() {
  await requireAdmin();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-2 text-sm text-gray-600">
          Manage your portfolio projects and content
        </p>
      </div>
      
      <ProjectsManagement />
    </div>
  );
}
