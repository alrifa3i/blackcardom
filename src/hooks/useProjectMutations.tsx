
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { QUERY_KEYS, invalidateAllQueries } from '@/utils/queryKeys';
import type { Database } from '@/integrations/supabase/types';

type Project = Database['public']['Tables']['projects']['Row'];

interface ProjectFormData {
  name: string;
  description: string;
  country: string;
  date: string;
  status: string;
  project_url: string;
  image_url: string;
  logo: string;
  technologies: string;
  achievements: string;
  stats: string;
  is_visible: boolean;
  display_order: number;
}

export const useProjectMutations = () => {
  const queryClient = useQueryClient();

  // Helper function to validate and prepare project data
  const prepareProjectData = (data: ProjectFormData) => {
    console.log('Preparing project data:', data);
    
    // Validate required fields
    if (!data.name?.trim()) {
      throw new Error('اسم المشروع مطلوب');
    }
    if (!data.description?.trim()) {
      throw new Error('وصف المشروع مطلوب');
    }
    if (!data.country?.trim()) {
      throw new Error('البلد مطلوب');
    }
    if (!data.date?.trim()) {
      throw new Error('تاريخ المشروع مطلوب');
    }

    const projectData = {
      name: data.name.trim(),
      description: data.description.trim(),
      country: data.country.trim(),
      date: data.date.trim(),
      status: data.status || 'مكتمل',
      project_url: data.project_url?.trim() || null,
      image_url: data.image_url?.trim() || null,
      logo: data.logo?.trim() || null,
      technologies: data.technologies ? data.technologies.split(',').map((t: string) => t.trim()).filter(Boolean) : [],
      achievements: data.achievements ? data.achievements.split(',').map((a: string) => a.trim()).filter(Boolean) : [],
      stats: (() => {
        try {
          return data.stats ? JSON.parse(data.stats) : {};
        } catch (e) {
          console.warn('Invalid JSON in stats field, using empty object');
          return {};
        }
      })(),
      is_visible: Boolean(data.is_visible),
      display_order: Number(data.display_order) || 0
    };

    console.log('Prepared project data:', projectData);
    return projectData;
  };

  // Create project mutation
  const createMutation = useMutation({
    mutationFn: async (data: ProjectFormData) => {
      console.log('Creating project with data:', data);
      const projectData = prepareProjectData(data);

      const { data: result, error } = await supabase
        .from('projects')
        .insert([projectData])
        .select()
        .single();
      
      if (error) {
        console.error('Supabase error creating project:', error);
        throw new Error(`خطأ في إنشاء المشروع: ${error.message}`);
      }
      
      console.log('Project created successfully:', result);
      return result;
    },
    onMutate: async (newProject) => {
      console.log('Creating project - onMutate');
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.PROJECTS });
      const previousProjects = queryClient.getQueryData(QUERY_KEYS.PROJECTS);
      
      const tempProject = {
        id: 'temp-' + Date.now(),
        ...prepareProjectData(newProject),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      queryClient.setQueryData(QUERY_KEYS.PROJECTS, (old: any) => 
        old ? [...old, tempProject] : [tempProject]
      );
      
      return { previousProjects };
    },
    onSuccess: (data) => {
      console.log('Project created successfully - onSuccess:', data);
      invalidateAllQueries(queryClient, 'projects');
      toast({
        title: "✅ تم إضافة المشروع",
        description: "تم حفظ البيانات بنجاح"
      });
    },
    onError: (error: any, newProject, context) => {
      console.error('Error creating project - onError:', error);
      if (context?.previousProjects) {
        queryClient.setQueryData(QUERY_KEYS.PROJECTS, context.previousProjects);
      }
      toast({
        title: "❌ خطأ في حفظ المشروع",
        description: error.message || "حدث خطأ غير متوقع",
        variant: "destructive"
      });
    }
  });

  // Update project mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string, data: ProjectFormData }) => {
      console.log('Starting update mutation for project:', id);
      console.log('Update data received:', data);
      
      const projectData = prepareProjectData(data);
      console.log('Prepared data for update:', projectData);

      const { data: result, error } = await supabase
        .from('projects')
        .update(projectData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        console.error('Update error from Supabase:', error);
        throw new Error(`خطأ في تحديث المشروع: ${error.message}`);
      }
      
      console.log('Update successful, result:', result);
      return result;
    },
    onMutate: async ({ id, data }) => {
      console.log('Update mutation onMutate - canceling queries');
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.PROJECTS });
      const previousProjects = queryClient.getQueryData(QUERY_KEYS.PROJECTS);
      
      console.log('Applying optimistic update');
      queryClient.setQueryData(QUERY_KEYS.PROJECTS, (old: any) =>
        old ? old.map((project: any) => 
          project.id === id ? { ...project, ...prepareProjectData(data) } : project
        ) : []
      );
      
      return { previousProjects };
    },
    onSuccess: (data) => {
      console.log('Update mutation onSuccess:', data);
      invalidateAllQueries(queryClient, 'projects');
      toast({
        title: "✅ تم تحديث المشروع",
        description: "تم حفظ البيانات بنجاح"
      });
    },
    onError: (error: any, variables, context) => {
      console.error('Update mutation onError:', error);
      if (context?.previousProjects) {
        queryClient.setQueryData(QUERY_KEYS.PROJECTS, context.previousProjects);
      }
      toast({
        title: "❌ خطأ في تحديث المشروع",
        description: error.message || "حدث خطأ غير متوقع",
        variant: "destructive"
      });
    }
  });

  // Delete project mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      console.log('Deleting project:', id);
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);
      if (error) throw error;
      return id;
    },
    onMutate: async (deletedId) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.PROJECTS });
      const previousProjects = queryClient.getQueryData(QUERY_KEYS.PROJECTS);
      
      queryClient.setQueryData(QUERY_KEYS.PROJECTS, (old: any) =>
        old ? old.filter((project: any) => project.id !== deletedId) : []
      );
      
      return { previousProjects };
    },
    onSuccess: () => {
      console.log('Project deleted successfully');
      invalidateAllQueries(queryClient, 'projects');
      toast({
        title: "تم حذف المشروع",
        description: "تم حذف المشروع بنجاح"
      });
    },
    onError: (error: any, deletedId, context) => {
      if (context?.previousProjects) {
        queryClient.setQueryData(QUERY_KEYS.PROJECTS, context.previousProjects);
      }
      console.error('Error deleting project:', error);
      toast({
        title: "خطأ في حذف المشروع",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  // Toggle visibility mutation
  const toggleVisibilityMutation = useMutation({
    mutationFn: async ({ id, is_visible }: { id: string, is_visible: boolean }) => {
      console.log('Toggling project visibility:', id, is_visible);
      const { error } = await supabase
        .from('projects')
        .update({ is_visible })
        .eq('id', id);
      if (error) throw error;
      return { id, is_visible };
    },
    onMutate: async ({ id, is_visible }) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.PROJECTS });
      const previousProjects = queryClient.getQueryData(QUERY_KEYS.PROJECTS);
      
      queryClient.setQueryData(QUERY_KEYS.PROJECTS, (old: any) =>
        old ? old.map((project: any) => 
          project.id === id ? { ...project, is_visible } : project
        ) : []
      );
      
      return { previousProjects };
    },
    onSuccess: () => {
      console.log('Project visibility updated successfully');
      invalidateAllQueries(queryClient, 'projects');
    },
    onError: (error: any, variables, context) => {
      if (context?.previousProjects) {
        queryClient.setQueryData(QUERY_KEYS.PROJECTS, context.previousProjects);
      }
      console.error('Error updating project visibility:', error);
      toast({
        title: "خطأ في تحديث المشروع",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  return {
    createMutation,
    updateMutation,
    deleteMutation,
    toggleVisibilityMutation
  };
};

export type { ProjectFormData };
