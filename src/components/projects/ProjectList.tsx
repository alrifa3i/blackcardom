
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import ProjectCard from './ProjectCard';
import type { Database } from '@/integrations/supabase/types';

type Project = Database['public']['Tables']['projects']['Row'];

interface ProjectListProps {
  projects: Project[] | undefined;
  isLoading: boolean;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  onToggleVisibility: (project: Project) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  isLoading,
  onEdit,
  onDelete,
  onToggleVisibility
}) => {
  if (isLoading) {
    return (
      <Card className="bg-gray-900 border-gray-700">
        <CardContent className="p-6">
          <div className="text-center text-gray-400">جارٍ تحميل المشاريع...</div>
        </CardContent>
      </Card>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <Card className="bg-gray-900 border-gray-700">
        <CardContent className="p-6 text-center">
          <p className="text-gray-400">لا توجد مشاريع حتى الآن</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleVisibility={onToggleVisibility}
        />
      ))}
    </div>
  );
};

export default ProjectList;
