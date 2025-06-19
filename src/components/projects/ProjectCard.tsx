
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Eye, EyeOff, ExternalLink } from 'lucide-react';
import type { Database } from '@/integrations/supabase/types';

type Project = Database['public']['Tables']['projects']['Row'];

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  onToggleVisibility: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onEdit,
  onDelete,
  onToggleVisibility
}) => {
  const getStringArray = (value: any): string[] => {
    if (Array.isArray(value)) {
      return value;
    }
    return [];
  };

  const handleDelete = () => {
    if (window.confirm('هل أنت متأكد من حذف هذا المشروع؟')) {
      onDelete(project.id);
    }
  };

  return (
    <Card className="bg-gray-900 border-gray-700">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-white flex items-center gap-2">
              {project.name}
              {!project.is_visible && <EyeOff className="h-4 w-4 text-gray-500" />}
            </CardTitle>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary">{project.country}</Badge>
              <Badge variant="outline">{project.status}</Badge>
              <span className="text-gray-400 text-sm">{project.date}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggleVisibility(project)}
              className="text-gray-400 hover:text-white"
            >
              {project.is_visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </Button>
            {project.project_url && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open(project.project_url!, '_blank')}
                className="text-gray-400 hover:text-white"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(project)}
              className="text-gray-400 hover:text-white"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              className="text-red-400 hover:text-red-300"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300 mb-4">{project.description}</p>
        {project.technologies && getStringArray(project.technologies).length > 0 && (
          <div className="flex flex-wrap gap-2">
            {getStringArray(project.technologies).map((tech, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
