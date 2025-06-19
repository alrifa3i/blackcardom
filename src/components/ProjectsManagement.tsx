import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Edit, Trash2, Eye, EyeOff, ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS, invalidateAllQueries, DEFAULT_QUERY_OPTIONS } from '@/utils/queryKeys';
import type { Database } from '@/integrations/supabase/types';

type Project = Database['public']['Tables']['projects']['Row'];

const ProjectsManagement = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
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

  const queryClient = useQueryClient();

  // استخدام المفاتيح الموحدة والإعدادات المحسنة
  const { data: projects, isLoading } = useQuery({
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

  // إضافة مشروع جديد مع Optimistic Update
  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      console.log('Creating project:', data);
      const projectData = {
        name: data.name,
        description: data.description,
        country: data.country,
        date: data.date,
        status: data.status,
        project_url: data.project_url || null,
        image_url: data.image_url || null,
        logo: data.logo || null,
        technologies: data.technologies ? data.technologies.split(',').map((t: string) => t.trim()) : [],
        achievements: data.achievements ? data.achievements.split(',').map((a: string) => a.trim()) : [],
        stats: data.stats ? JSON.parse(data.stats) : {},
        is_visible: data.is_visible,
        display_order: data.display_order
      };

      const { data: result, error } = await supabase
        .from('projects')
        .insert([projectData])
        .select()
        .single();
      
      if (error) throw error;
      return result;
    },
    onMutate: async (newProject) => {
      // Optimistic update
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.PROJECTS });
      const previousProjects = queryClient.getQueryData(QUERY_KEYS.PROJECTS);
      
      // إضافة المشروع الجديد مؤقتاً
      const tempProject = {
        id: 'temp-' + Date.now(),
        ...newProject,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      queryClient.setQueryData(QUERY_KEYS.PROJECTS, (old: any) => 
        old ? [...old, tempProject] : [tempProject]
      );
      
      return { previousProjects };
    },
    onSuccess: () => {
      console.log('Project created successfully');
      invalidateAllQueries(queryClient, 'projects');
      toast({
        title: "تم إضافة المشروع",
        description: "تم حفظ البيانات بنجاح"
      });
      resetForm();
    },
    onError: (error: any, newProject, context) => {
      // التراجع عن Optimistic update
      if (context?.previousProjects) {
        queryClient.setQueryData(QUERY_KEYS.PROJECTS, context.previousProjects);
      }
      console.error('Error creating project:', error);
      toast({
        title: "خطأ في حفظ المشروع",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  // تحديث مشروع مع Optimistic Update
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string, data: any }) => {
      console.log('Updating project:', id, data);
      const projectData = {
        name: data.name,
        description: data.description,
        country: data.country,
        date: data.date,
        status: data.status,
        project_url: data.project_url || null,
        image_url: data.image_url || null,
        logo: data.logo || null,
        technologies: data.technologies ? data.technologies.split(',').map((t: string) => t.trim()) : [],
        achievements: data.achievements ? data.achievements.split(',').map((a: string) => a.trim()) : [],
        stats: data.stats ? JSON.parse(data.stats) : {},
        is_visible: data.is_visible,
        display_order: data.display_order
      };

      const { data: result, error } = await supabase
        .from('projects')
        .update(projectData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return result;
    },
    onMutate: async ({ id, data }) => {
      // Optimistic update
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.PROJECTS });
      const previousProjects = queryClient.getQueryData(QUERY_KEYS.PROJECTS);
      
      queryClient.setQueryData(QUERY_KEYS.PROJECTS, (old: any) =>
        old ? old.map((project: any) => 
          project.id === id ? { ...project, ...data } : project
        ) : []
      );
      
      return { previousProjects };
    },
    onSuccess: () => {
      console.log('Project updated successfully');
      invalidateAllQueries(queryClient, 'projects');
      toast({
        title: "تم تحديث المشروع",
        description: "تم حفظ البيانات بنجاح"
      });
      resetForm();
    },
    onError: (error: any, variables, context) => {
      // التراجع عن Optimistic update
      if (context?.previousProjects) {
        queryClient.setQueryData(QUERY_KEYS.PROJECTS, context.previousProjects);
      }
      console.error('Error updating project:', error);
      toast({
        title: "خطأ في تحديث المشروع",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  // حذف مشروع مع Optimistic Update
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
      // Optimistic update
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
      // التراجع عن Optimistic update
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

  // تغيير حالة الرؤية مع Optimistic Update
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
      // Optimistic update
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
      // التراجع عن Optimistic update
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting form:', { editingProject, formData });
    
    if (editingProject) {
      updateMutation.mutate({ id: editingProject.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleEdit = (project: Project) => {
    console.log('Editing project:', project);
    setEditingProject(project);
    setFormData({
      name: project.name,
      description: project.description,
      country: project.country,
      date: project.date,
      status: project.status,
      project_url: project.project_url || '',
      image_url: project.image_url || '',
      logo: project.logo || '',
      technologies: Array.isArray(project.technologies) ? project.technologies.join(', ') : '',
      achievements: Array.isArray(project.achievements) ? project.achievements.join(', ') : '',
      stats: JSON.stringify(project.stats || {}),
      is_visible: project.is_visible,
      display_order: project.display_order
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المشروع؟')) {
      deleteMutation.mutate(id);
    }
  };

  const toggleVisibility = (project: Project) => {
    toggleVisibilityMutation.mutate({ id: project.id, is_visible: !project.is_visible });
  };

  const resetForm = () => {
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
    setIsDialogOpen(false);
  };

  const getStringArray = (value: any): string[] => {
    if (Array.isArray(value)) {
      return value;
    }
    return [];
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  if (isLoading) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-gray-400">جارٍ تحميل المشاريع...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">إدارة المشاريع</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => {
                resetForm();
                setIsDialogOpen(true);
              }}
              className="bg-yellow-500 text-black hover:bg-yellow-400"
            >
              <Plus className="h-4 w-4 ml-2" />
              إضافة مشروع جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-700 max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white">
                {editingProject ? 'تعديل المشروع' : 'إضافة مشروع جديد'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-white">اسم المشروع *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-gray-800 border-gray-600 text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="country" className="text-white">البلد *</Label>
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="bg-gray-800 border-gray-600 text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="text-white">الوصف *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="bg-gray-800 border-gray-600 text-white"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date" className="text-white">تاريخ المشروع *</Label>
                  <Input
                    id="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="bg-gray-800 border-gray-600 text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="status" className="text-white">الحالة</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="مكتمل">مكتمل</SelectItem>
                      <SelectItem value="قيد التطوير">قيد التطوير</SelectItem>
                      <SelectItem value="متوقف">متوقف</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="project_url" className="text-white">رابط المشروع</Label>
                  <Input
                    id="project_url"
                    type="url"
                    value={formData.project_url}
                    onChange={(e) => setFormData({ ...formData, project_url: e.target.value })}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="image_url" className="text-white">رابط الصورة</Label>
                  <Input
                    id="image_url"
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="technologies" className="text-white">التقنيات المستخدمة (مفصولة بفواصل)</Label>
                <Input
                  id="technologies"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  className="bg-gray-800 border-gray-600 text-white"
                  placeholder="React, Node.js, MongoDB"
                />
              </div>

              <div className="flex justify-end gap-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                  className="border-gray-600 text-gray-300"
                >
                  إلغاء
                </Button>
                <Button 
                  type="submit"
                  className="bg-yellow-500 text-black hover:bg-yellow-400"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'جاري الحفظ...' : editingProject ? 'تحديث' : 'إضافة'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {projects?.length === 0 ? (
          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-6 text-center">
              <p className="text-gray-400">لا توجد مشاريع حتى الآن</p>
            </CardContent>
          </Card>
        ) : (
          projects?.map((project) => (
            <Card key={project.id} className="bg-gray-900 border-gray-700">
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
                      onClick={() => toggleVisibility(project)}
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
                      onClick={() => handleEdit(project)}
                      className="text-gray-400 hover:text-white"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(project.id)}
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
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectsManagement;
