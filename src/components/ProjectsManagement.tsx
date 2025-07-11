
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, ArrowLeft } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS, DEFAULT_QUERY_OPTIONS } from '@/utils/queryKeys';
import { supabase } from '@/integrations/supabase/client';
import { useProjectMutations, type ProjectFormData } from '@/hooks/useProjectMutations';
import ProjectForm from '@/components/projects/ProjectForm';
import ProjectList from '@/components/projects/ProjectList';
import { toast } from '@/hooks/use-toast';
import type { Database } from '@/integrations/supabase/types';

type Project = Database['public']['Tables']['projects']['Row'];

const ProjectsManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<ProjectFormData>({
    name: '',
    description: '',
    country: '',
    date: '',
    status: 'مكتمل',
    project_url: '',
    image_url: '',
    logo: '',
    technologies: '',
    achievements: '',
    stats: '',
    is_visible: true,
    display_order: 0
  });

  const { createMutation, updateMutation, deleteMutation, toggleVisibilityMutation } = useProjectMutations();

  const { data: projects, isLoading, refetch } = useQuery({
    queryKey: QUERY_KEYS.PROJECTS,
    queryFn: async () => {
      console.log('Fetching projects...');
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Error fetching projects:', error);
        throw error;
      }
      console.log('Projects fetched:', data);
      return data || [];
    },
    ...DEFAULT_QUERY_OPTIONS
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submission started');
    console.log('Editing project:', editingProject);
    console.log('Form data before submission:', formData);
    
    // التحقق من وجود البيانات المطلوبة
    if (!formData.name?.trim()) {
      toast({
        title: "❌ خطأ في البيانات",
        description: "اسم المشروع مطلوب",
        variant: "destructive"
      });
      return;
    }
    
    if (!formData.description?.trim()) {
      toast({
        title: "❌ خطأ في البيانات",
        description: "وصف المشروع مطلوب",
        variant: "destructive"
      });
      return;
    }

    if (!formData.country?.trim()) {
      toast({
        title: "❌ خطأ في البيانات",
        description: "البلد مطلوب",
        variant: "destructive"
      });
      return;
    }

    if (!formData.date?.trim()) {
      toast({
        title: "❌ خطأ في البيانات",
        description: "تاريخ المشروع مطلوب",
        variant: "destructive"
      });
      return;
    }
    
    // Prevent multiple submissions
    if (createMutation.isPending || updateMutation.isPending) {
      console.log('Submission already in progress, ignoring');
      return;
    }
    
    try {
      if (editingProject?.id) {
        console.log('Updating project with ID:', editingProject.id);
        console.log('Update data:', formData);
        
        await updateMutation.mutateAsync({ 
          id: editingProject.id, 
          data: formData
        });
        
        console.log('Update completed successfully');
        resetForm();
        // Refresh the projects list
        refetch();
      } else {
        console.log('Creating new project');
        await createMutation.mutateAsync(formData);
        console.log('Create completed successfully');
        resetForm();
        // Refresh the projects list
        refetch();
      }
    } catch (error) {
      console.error('Form submission error:', error);
      // Error is already handled by the mutation's onError callback
    }
  };

  const handleEdit = (project: Project) => {
    console.log('Starting edit for project:', project);
    setEditingProject(project);
    
    // تحويل البيانات بشكل صحيح
    const formattedData: ProjectFormData = {
      name: project.name || '',
      description: project.description || '',
      country: project.country || '',
      date: project.date || '',
      status: project.status || 'مكتمل',
      project_url: project.project_url || '',
      image_url: project.image_url || '',
      logo: project.logo || '',
      technologies: Array.isArray(project.technologies) 
        ? project.technologies.join(', ') 
        : typeof project.technologies === 'string' 
        ? project.technologies 
        : '',
      achievements: Array.isArray(project.achievements) 
        ? project.achievements.join(', ') 
        : typeof project.achievements === 'string' 
        ? project.achievements 
        : '',
      stats: project.stats && typeof project.stats === 'object' 
        ? JSON.stringify(project.stats, null, 2) 
        : project.stats 
        ? String(project.stats) 
        : '',
      is_visible: Boolean(project.is_visible),
      display_order: Number(project.display_order) || 0
    };
    
    console.log('Formatted form data:', formattedData);
    setFormData(formattedData);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المشروع؟')) {
      deleteMutation.mutate(id);
    }
  };

  const handleToggleVisibility = (project: Project) => {
    toggleVisibilityMutation.mutate({ id: project.id, is_visible: !project.is_visible });
  };

  const resetForm = () => {
    console.log('Resetting form');
    setFormData({
      name: '',
      description: '',
      country: '',
      date: '',
      status: 'مكتمل',
      project_url: '',
      image_url: '',
      logo: '',
      technologies: '',
      achievements: '',
      stats: '',
      is_visible: true,
      display_order: 0
    });
    setEditingProject(null);
    setShowForm(false);
  };

  const handleAddNew = () => {
    console.log('Adding new project');
    resetForm();
    setShowForm(true);
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  if (showForm) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => setShowForm(false)}
            className="text-gray-400 hover:text-white"
            disabled={isSubmitting}
          >
            <ArrowLeft className="h-4 w-4 ml-2" />
            العودة للقائمة
          </Button>
          <h1 className="text-3xl font-bold text-white">
            {editingProject ? 'تعديل المشروع' : 'إضافة مشروع جديد'}
          </h1>
        </div>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
          <ProjectForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            isEditing={!!editingProject}
            onCancel={() => !isSubmitting && setShowForm(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">إدارة المشاريع</h1>
        <Button 
          onClick={handleAddNew}
          className="bg-yellow-500 text-black hover:bg-yellow-400"
        >
          <Plus className="h-4 w-4 ml-2" />
          إضافة مشروع جديد
        </Button>
      </div>

      <ProjectList
        projects={projects}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleVisibility={handleToggleVisibility}
      />
    </div>
  );
};

export default ProjectsManagement;
