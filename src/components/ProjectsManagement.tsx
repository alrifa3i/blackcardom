
import React, { useState, useEffect } from 'react';
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

interface Project {
  id: string;
  name: string;
  description: string;
  country: string;
  date: string;
  status: string;
  project_url: string | null;
  image_url: string | null;
  logo: string | null;
  technologies: string[];
  achievements: string[];
  stats: Record<string, any>;
  is_visible: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

const ProjectsManagement = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Error fetching projects:', error);
        toast({
          title: "خطأ في تحميل المشاريع",
          description: error.message,
          variant: "destructive"
        });
        return;
      }

      setProjects(data || []);
    } catch (error: any) {
      console.error('Error fetching projects:', error);
      toast({
        title: "خطأ في تحميل المشاريع",
        description: error.message || "حدث خطأ غير متوقع",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const projectData = {
        name: formData.name,
        description: formData.description,
        country: formData.country,
        date: formData.date,
        status: formData.status,
        project_url: formData.project_url || null,
        image_url: formData.image_url || null,
        logo: formData.logo || null,
        technologies: formData.technologies ? formData.technologies.split(',').map(t => t.trim()) : [],
        achievements: formData.achievements ? formData.achievements.split(',').map(a => a.trim()) : [],
        stats: formData.stats ? JSON.parse(formData.stats) : {},
        is_visible: formData.is_visible,
        display_order: formData.display_order
      };

      let error;
      if (editingProject) {
        const { error: updateError } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', editingProject.id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from('projects')
          .insert([projectData]);
        error = insertError;
      }

      if (error) {
        toast({
          title: "خطأ في حفظ المشروع",
          description: error.message,
          variant: "destructive"
        });
        return;
      }

      toast({
        title: editingProject ? "تم تحديث المشروع" : "تم إضافة المشروع",
        description: "تم حفظ البيانات بنجاح"
      });

      setIsDialogOpen(false);
      resetForm();
      fetchProjects();
    } catch (error: any) {
      toast({
        title: "خطأ في حفظ المشروع",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleEdit = (project: Project) => {
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

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا المشروع؟')) return;

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "خطأ في حذف المشروع",
        description: error.message,
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "تم حذف المشروع",
      description: "تم حذف المشروع بنجاح"
    });

    fetchProjects();
  };

  const toggleVisibility = async (project: Project) => {
    const { error } = await supabase
      .from('projects')
      .update({ is_visible: !project.is_visible })
      .eq('id', project.id);

    if (error) {
      toast({
        title: "خطأ في تحديث المشروع",
        description: error.message,
        variant: "destructive"
      });
      return;
    }

    fetchProjects();
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
  };

  if (loading) {
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
                >
                  {editingProject ? 'تحديث' : 'إضافة'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {projects.length === 0 ? (
          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-6 text-center">
              <p className="text-gray-400">لا توجد مشاريع حتى الآن</p>
            </CardContent>
          </Card>
        ) : (
          projects.map((project) => (
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
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
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
